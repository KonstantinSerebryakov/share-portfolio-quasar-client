// src/boot/03-axios-interceptors.ts

import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { boot } from 'quasar/wrappers';
import { getJWT, removeJWT } from 'src/services/utility/jwtLocalStorage';

export default boot(({ app, router }) => {
  const api = app.config.globalProperties.$api;

  function navigateToSignIn() {
    const currentPath = router.currentRoute.value.path;
    router.push(`/signin?prev=${currentPath}`);
  }

  function abortRequest(config: InternalAxiosRequestConfig<unknown>) {
    const controller = new AbortController();
    const cfg = {
      ...config,
      signal: controller.signal,
    };
    controller.abort('Unauthorized');
    return cfg;
  }

  // Request interceptor
  app.config.globalProperties.$api.interceptors.request.use(
    (config) => {
      const token = getJWT()?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
      /*
      // abort request
      app.config.globalProperties.$q.notify({
        type: 'error',
        message: String('auth access token not found'),
      });
      navigateToSignIn();
      return abortRequest(config);
      */
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // TODO: apply logout response interceptor conditionally in router
  // Response interceptor
  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error: AxiosError) => {
  //     if (error.response?.status === 401) {
  //       removeJWT();
  //       app.config.globalProperties.$q.notify({
  //         type: 'error',
  //         message: String(error.response.data),
  //       });
  //       navigateToSignIn();
  //     }
  //     return Promise.reject(error);
  //   }
  // );
});
