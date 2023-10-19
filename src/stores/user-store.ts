import { defineStore } from 'pinia';
import mitt from 'mitt';
import { UserStoreApi } from '../services/axios/user-store-api';
import {
  clearUserSessionStorage,
  extractUserSessionStorage,
  pushUserSessionStorage,
} from '../services/browser_storages/user-store-session-storage';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
import { UserEntity } from 'src/entities';
import { STORE_STATE } from './services/store-state.enum';
import { computed, watch } from 'vue';

export const userStoreEventEmitter = mitt();
export enum USER_STORE_EVENT {
  // LOCAL
  FULLFILLED = 'FULLFILLED',

  // API
  UPLOAD_USER_SUCCESS = 'UPLOAD_USER_SUCCESS',

  // STATE
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
}

export const useUserStore = defineStore('user', {
  state: () => ({
    data: null as UserEntity | null,
    dataState: STORE_STATE.INITIAL as STORE_STATE,
  }),

  getters: {
    isSynchronized: (state) => {
      return computed(() => state.dataState === STORE_STATE.FULLFILLED);
    },
    isInitial: (state) => {
      return computed(() => state.dataState === STORE_STATE.INITIAL);
    },
  },
  actions: {
    async synchronizeByEmail(email: string, force = false) {
      if (this.$state.data && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.data) return;

      this.$state.dataState = STORE_STATE.PENDING_REMOTE;
      const fetched = await UserStoreApi.getUser(email);
    },
    async synchronizeWithSessionStorage(force = false) {
      if (
        !force &&
        this.$state.dataState !== STORE_STATE.INITIAL &&
        this.$state.dataState !== STORE_STATE.CLEARED &&
        this.$state.dataState !== STORE_STATE.ERROR
      ) {
        return;
      }
      this.$state.dataState = STORE_STATE.PENDING_BROWSER_STORAGE;
      const sessionUser = await extractUserSessionStorage();
      if (sessionUser) {
        this.$state.data = sessionUser;
        this.$state.dataState = STORE_STATE.FULLFILLED;
      } else {
        this.$state.data = null;
      }
    },
    async storeSessionStorage() {
      const user = this.$state.data;
      if (user) {
        pushUserSessionStorage(user).then(() => {
          this.$state.dataState = STORE_STATE.FULLFILLED;
        });
      } else {
        clearUserSessionStorage().then(() => {
          this.$state.dataState = STORE_STATE.CLEARED;
        });
      }
    },
  },
});

const userStore = useUserStore();
watch(userStore.isSynchronized, async (newValue, oldValue) => {
  if (newValue) {
    userStoreEventEmitter.emit(USER_STORE_EVENT.FULLFILLED);
  }
});
userStoreEventEmitter.on(USER_STORE_EVENT.GET_USER_SUCCESS, (data) => {
  const user = data as UserEntity;
  userStore.$state.data = user;
  userStore.storeSessionStorage();
});
//
// OUTER
//
eventBus.on(EVENT_APPLICATION.LOGIN_SUCCESS, (data) => {
  const payload = data as IEventPayloadLoginSuccess;
  userStore.synchronizeByEmail(payload.email);
});
eventBus.on(EVENT_APPLICATION.LOGOUT_SUCCESS, () => {
  userStore.$state.data = null;
  userStore.storeSessionStorage();
});
