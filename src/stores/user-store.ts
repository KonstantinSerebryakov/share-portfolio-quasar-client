import { defineStore } from 'pinia';
import mitt from 'mitt';
import { UserStoreApi } from '../services/axios/user-store-api';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
import { UserEntity } from 'src/entities';
import { STORE_STATE } from './services/store-state.enum';
import { computed, watch } from 'vue';
import {
  clearUserLocalStorage,
  extractUserLocalStorage,
  pushUserLocalStorage,
} from 'src/services/browser_storages/user-store-local-storage';

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

      await this.synchronizeWithLocalStorage();
      if (this.$state.data) return;

      this.$state.dataState = STORE_STATE.PENDING_REMOTE;
      const fetched = await UserStoreApi.getUser(email);
    },
    async synchronizeWithLocalStorage(force = false) {
      if (
        !force &&
        this.$state.dataState !== STORE_STATE.INITIAL &&
        this.$state.dataState !== STORE_STATE.CLEARED &&
        this.$state.dataState !== STORE_STATE.ERROR
      ) {
        return;
      }
      const isFetchRequired = this.$state.dataState === STORE_STATE.INITIAL;

      this.$state.dataState = STORE_STATE.PENDING_BROWSER_STORAGE;
      const localUser = await extractUserLocalStorage();
      if (localUser) {
        if (isFetchRequired) {
          this.synchronizeByEmail(localUser.email);
          return;
        }
        this.$state.data = localUser;
        this.$state.dataState = STORE_STATE.FULLFILLED;
      } else {
        this.$state.data = null;
      }
    },
    async storeLocalStorage() {
      const user = this.$state.data;
      if (user) {
        pushUserLocalStorage(user).then(() => {
          this.$state.dataState = STORE_STATE.FULLFILLED;
        });
      } else {
        clearUserLocalStorage().then(() => {
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
  userStore.storeLocalStorage();
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
  userStore.storeLocalStorage();
});
