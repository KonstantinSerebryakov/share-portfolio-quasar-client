import { CredentialEntity, ProfileEntity, UserEntity } from 'src/entities';
import CancelablePromise from 'cancelable-promise';
import { ISocialMedias } from 'src/interfaces';
import {
  USER_STORE_EVENT,
  useUserStore,
  userStoreEventEmitter,
} from '../user-store';
import { deepCopy } from 'src/services/utility/utility';

const userStore = useUserStore();
export function getUserClone() {
  const user = userStore.$state.data;
  return user ? new UserEntity(user) : null;
}
export function getUserClonePromise() {
  return getClonePromise(() => {
    const user = userStore.$state.data;
    const clone = user ? new UserEntity(user) : null;
    return clone;
  });
}

// utility

function getClonePromise<T>(callback: () => T) {
  let resolveFunc: () => void;
  return new CancelablePromise((resolve, reject, onCancel) => {
    if (userStore.isSynchronized.value) resolve(null);
    resolveFunc = () => {
      resolve(null);
    };
    userStoreEventEmitter.on(USER_STORE_EVENT.FULLFILLED, resolveFunc);
    onCancel(() => {
      userStoreEventEmitter.off(USER_STORE_EVENT.FULLFILLED, resolveFunc);
    });
  })
    .then(() => {
      userStoreEventEmitter.off(USER_STORE_EVENT.FULLFILLED, resolveFunc);
      return;
    })
    .then(callback);
}
