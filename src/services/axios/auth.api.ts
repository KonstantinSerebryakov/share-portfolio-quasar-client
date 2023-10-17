import { AxiosError } from 'axios';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import {
  IEventPayloadLoginSuccess,
  IEventPayloadRegisterSuccess,
} from 'src/interfaces/application-event.interface';

export class AuthApi {
  static async login(loginData: { email: string; password: string }) {
    const URL = '/auth/login';
    this.fetchPost<{ access_token: string }>(URL, loginData, (payload) => {
      const token = payload.access_token;
      const eventPayload: IEventPayloadLoginSuccess = {
        email: loginData.email,
        token: token,
      };
      eventBus.emit(EVENT_APPLICATION.LOGIN_SUCCESS, eventPayload);
    });
  }
  static async register(registerData: { email: string; password: string }) {
    const URL = '/auth/register';
    this.fetchPost<{ email: string }>(URL, registerData, (payload) => {
      const email = payload.email;
      const eventPayload: IEventPayloadRegisterSuccess = {
        email: email,
      };
      eventBus.emit(EVENT_APPLICATION.LOGIN_SUCCESS, eventPayload);
    });
  }

  private static async fetchPost<T>(
    URL: string,
    payload: unknown,
    successCallback: (payload: T) => void
  ) {
    api
      .post(URL, payload)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          successCallback(response.data as T);
        } else {
          // notify('negative', response.status + ': ' + response.data);
          throw new AxiosError(response.status + ': ' + response.data);
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          Notify.create({
            type: 'warning',
            message: 'user already created',
          });
        } else {
          Notify.create({
            type: 'negative',
            message: 'Fetch error: ' + error.message,
          });
        }
      });
  }
}
