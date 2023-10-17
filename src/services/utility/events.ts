import mitt from 'mitt';

export const enum GLOBAL_EVENT {
  USER_LOGGED_IN = 'user-logged-in',
  USER_LOGGED_OUT = 'user-logged-out',
}

export const GlobalEventEmitter = mitt();
