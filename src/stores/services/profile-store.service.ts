import { CredentialEntity, ProfileEntity } from 'src/entities';
import {
  PROFILE_STORE_EVENT,
  profileStoreEventEmitter,
  useProfileStore,
} from '../profile-store';
import CancelablePromise from 'cancelable-promise';
import { ISocialMedias } from 'src/interfaces';

const profileStore = useProfileStore();
export function getProfileClone() {
  const profile = profileStore.$state.data;
  return profile ? new ProfileEntity(profile) : null;
}
export function getCredentialClone() {
  const profile = profileStore.$state.data;
  return profile ? profile.getCredentialClone() : null;
}
export function getCredentialCloneOrEmpty() {
  const clone = profileStore.$state.data?.getCredentialClone();
  if (clone) return clone;
  return clone ? clone : CredentialEntity.getEmpty();
}
export function getCredentialClonePromise() {
  return getClonePromise(() => {
    const profile = profileStore.data;
    const clone = profile ? profile.getCredentialClone() : null;
    return clone;
  });
}
export function getSocialMediaNodesClone() {
  const profile = profileStore.$state.data;
  return profile ? profile.getSocialMediaNodesClone() : null;
}
export function getSocialMediaNodesCloneOrEmpty() {
  const profile = profileStore.$state.data;
  const clone = profile ? profile.getSocialMediaNodesClone() : null;
  return clone ? clone : ([] as ISocialMedias);
}
export function getSocialMediaNodesClonePromise() {
  return getClonePromise(() => {
    const profile = profileStore.$state.data;
    return profile ? profile.getSocialMediaNodesClone() : null;
  });
}

// utility

function getClonePromise<T>(callback: () => T) {
  let resolveFunc: () => void;
  return new CancelablePromise((resolve, reject, onCancel) => {
    if (profileStore.isSynchronized.value) resolve(null);
    resolveFunc = () => {
      resolve(null);
    };
    profileStoreEventEmitter.on(PROFILE_STORE_EVENT.FULLFILLED, resolveFunc);
    onCancel(() => {
      profileStoreEventEmitter.off(PROFILE_STORE_EVENT.FULLFILLED, resolveFunc);
    });
  })
    .then(() => {
      profileStoreEventEmitter.off(PROFILE_STORE_EVENT.FULLFILLED, resolveFunc);
      return;
    })
    .then(callback);
}
