// src/boot/02-axios.ts

import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getJWT, removeJWT } from 'src/services/utility/jwtLocalStorage';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/api',
  // baseURL: 'https://share-portfolio-accounts-266df74f31c6.herokuapp.com/api',
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const token = getJWT()?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        app.config.globalProperties.$router.push('/signin');
        console.log(error.response);
        app.config.globalProperties.$q.notify({
          type: 'negative',
          message: JSON.stringify(error.response),
        });
        removeJWT();
      }

      return Promise.reject(error);
    }
  );
});

export { api };
