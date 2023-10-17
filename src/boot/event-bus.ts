// src/boot/04-event-bus.ts
import { boot } from 'quasar/wrappers';
import mitt from 'mitt';

export const enum EVENT_APPLICATION {
  LOGIN_SUCCESS = 'login-success',
  LOGOUT_SUCCESS = 'logout-success',
  REGISTER_SUCCESS = 'register-success',
}

export const eventBus = mitt();

export default boot(({ app }) => {
  app.config.globalProperties.$eventBus = eventBus;
});
