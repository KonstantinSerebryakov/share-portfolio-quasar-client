import { defineStore } from 'pinia';
import mitt from 'mitt';
import { IUser } from 'src/interfaces';
import { deepCopy } from 'src/services/utility/utility';
import { UserStoreApi } from '../services/axios/user-store-api';
import {
  clearUserSessionStorage,
  extractUserSessionStorage,
  pushUserSessionStorage,
} from '../services/browser_storages/user-store-session-storage';
import { eventBus, EVENT_APPLICATION } from 'src/boot/event-bus';
import { IEventPayloadLoginSuccess } from 'src/interfaces/application-event.interface';
import { UserEntity } from 'src/entities';

export const userStoreEventEmitter = mitt();
export enum USER_STORE_EVENT {
  // LOCAL
  USER_NOT_DEFINED = 'USER_NOT_DEFINED',

  // API
  UPLOAD_USER_SUCCESS = 'UPLOAD_USER_SUCCESS',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
}

export const useUserStore = defineStore('user', {
  state: () => ({ user: null as IUser | null }),
  getters: {
    userClone: (state) => {
      const user = state.user;
      return deepCopy(user);
    },
  },
  actions: {
    async synchronizeByEmail(email: string, force = false) {
      if (this.$state.user && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.user) return;

      const fetched = await UserStoreApi.getUser(email);
    },
    async synchronizeWithSessionStorage() {
      const sessionUser = await extractUserSessionStorage();
      if (sessionUser) this.$state.user = sessionUser;
      else this.$state.user = null;
    },
    async storeSessionStorage() {
      const user = this.$state.user;
      if (user) {
        pushUserSessionStorage(user);
      } else {
        clearUserSessionStorage();
      }
    },
  },
});

const userStore = useUserStore();
userStoreEventEmitter.on(USER_STORE_EVENT.GET_USER_SUCCESS, (data) => {
  const user = data as UserEntity;
  userStore.$state.user = user;
  userStore.storeSessionStorage();
});
//
// OUTER
//
eventBus.on(EVENT_APPLICATION.LOGIN_SUCCESS, (data) => {
  const payload = data as IEventPayloadLoginSuccess;
  userStore.synchronizeByEmail(payload.email);
});
