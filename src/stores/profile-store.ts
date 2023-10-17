import { defineStore } from 'pinia';
import {
  CredentialEntity,
  ProfileEntity,
  SocialMediaNodeEntity,
} from 'src/entities';
import mitt from 'mitt';
import {
  clearProfileSessionStorage,
  extractProfileSessionStorage,
  pushProfileSessionStorage,
} from '../services/browser_storages/profile-store-session-storage';
import { ProfileStoreApi } from '../services/axios/profile-store-api';
import { ISocialMedias } from 'src/interfaces';

export const profileStoreEventEmitter = mitt();
export enum PROFILE_STORE_EVENT {
  // LOCAL
  PROFILE_NOT_DEFINED = 'PROFILE_NOT_DEFINED',

  // API
  UPLOAD_PROFILE_NESTED_SUCCESS = 'UPLOAD_PROFILE_SUCCESS',
  UPLOAD_CREDENTIAL_SUCCESS = 'UPLOAD_CREDENTIAL_SUCCESS',
  UPLOAD_SOCIAL_MEDIA_NODES_SUCCESS = 'UPLOAD_SOCIAL_MEDIA_NODES_SUCCESS',
  DELETE_PROFILE_SUCCESS = 'DELETE_PROFILE_SUCCESS',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
}

export const useProfileStore = defineStore('profile', {
  state: () => ({ profile: null as ProfileEntity | null }),
  getters: {
    profileClone: (state) => {
      const profile = state.profile;
      return profile ? new ProfileEntity(profile) : null;
    },
    credentialClone: (state) => {
      const profile = state.profile;
      return profile ? profile.getCredentialClone() : null;
    },
    credentialCloneOrEmpty: (state) => {
      const clone = state.profile?.getCredentialClone();
      if (clone) return clone;
      return clone ? clone : CredentialEntity.getEmpty();
    },
    socialMediaNodesClone: (state) => {
      const profile = state.profile;
      return profile ? profile.getSocialMediaNodesClone() : null;
    },
    socialMediaNodesCloneOrEmpty: (state) => {
      const profile = state.profile;
      const clone = profile ? profile.getSocialMediaNodesClone() : null;
      return clone ? clone : ([] as ISocialMedias);
    },
  },
  actions: {
    async synchronizeDefault(force = false) {
      if (this.$state.profile && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.profile) return;

      const fetched = await ProfileStoreApi.getProfileDefault();
    },
    async synchronizeById(profileId: string, force = false) {
      if (this.$state.profile && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.profile) return;

      const fetched = await ProfileStoreApi.getProfile(profileId);
    },
    synchronizeWithSessionStorage() {
      const sessionProfile = extractProfileSessionStorage();

      if (sessionProfile) {
        console.log(Object.getOwnPropertyNames(sessionProfile));
        const ent2 = new ProfileEntity(sessionProfile);
        console.log(ent2);
      }
      if (sessionProfile) this.$state.profile = sessionProfile;
      else this.$state.profile = null;
    },
    async storeSessionStorage() {
      const profile = this.$state.profile;
      if (profile) {
        pushProfileSessionStorage(profile);
      } else {
        clearProfileSessionStorage();
      }
    },
  },
});

const profileStore = useProfileStore();
profileStoreEventEmitter.on(PROFILE_STORE_EVENT.PROFILE_NOT_DEFINED, () => {
  profileStore.synchronizeWithSessionStorage();
});
profileStoreEventEmitter.on(
  PROFILE_STORE_EVENT.UPLOAD_PROFILE_NESTED_SUCCESS,
  (data) => {
    const profile = data as ProfileEntity;
    profileStore.$state.profile = profile;
    profileStore.storeSessionStorage();
  }
);
profileStoreEventEmitter.on(
  PROFILE_STORE_EVENT.UPLOAD_CREDENTIAL_SUCCESS,
  (data) => {
    const credential = data as CredentialEntity;
    if (profileStore.$state.profile) {
      profileStore.$state.profile.credential = credential;
      profileStore.storeSessionStorage();
    } else {
      //TODO:
    }
  }
);
profileStoreEventEmitter.on(
  PROFILE_STORE_EVENT.UPLOAD_SOCIAL_MEDIA_NODES_SUCCESS,
  (data) => {
    const socialMediaNodes = data as SocialMediaNodeEntity[];
    if (profileStore.$state.profile) {
      profileStore.$state.profile.socialMediaNodes = socialMediaNodes;
      profileStore.storeSessionStorage();
    } else {
      //TODO:
    }
  }
);
profileStoreEventEmitter.on(PROFILE_STORE_EVENT.GET_PROFILE_SUCCESS, (data) => {
  const profile = data as ProfileEntity;
  profileStore.$state.profile = profile;
  profileStore.storeSessionStorage();
});
profileStoreEventEmitter.on(PROFILE_STORE_EVENT.DELETE_PROFILE_SUCCESS, () => {
  profileStore.$state.profile = null;
  profileStore.storeSessionStorage();
});
