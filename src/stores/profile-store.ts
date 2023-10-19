import { defineStore } from 'pinia';
import {
  CredentialEntity,
  ProfileEntity,
  SocialMediaNodeEntity,
} from 'src/entities';
import {
  clearProfileSessionStorage,
  extractProfileSessionStorage,
  pushProfileSessionStorage,
} from '../services/browser_storages/profile-store-session-storage';
import { ProfileStoreApi } from '../services/axios/profile-store-api';
import { ISocialMedias } from 'src/interfaces';
import { computed, ref, watch } from 'vue';
import mitt from 'mitt';
enum PROFILE_STORE_STATE {
  INITIAL = 'INITIAL',
  PENDING_BROWSER_STORAGE = 'PENDING_BROWSER_STORAGE',
  PENDING_REMOTE = 'PENDING_REMOTE',
  FULLFILLED = 'FULLFILLED',
  ERROR = 'ERROR',
}

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

  // STATE
  FULLFILLED = 'FULLFILLED',
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    data: null as ProfileEntity | null,
    dataState: PROFILE_STORE_STATE.INITIAL as PROFILE_STORE_STATE,
  }),
  getters: {
    profileClone: (state) => {
      const profile = state.data;
      return profile ? new ProfileEntity(profile) : null;
    },
    credentialClone: (state) => {
      const profile = state.data;
      return profile ? profile.getCredentialClone() : null;
    },
    credentialCloneOrEmpty: (state) => {
      const clone = state.data?.getCredentialClone();
      if (clone) return clone;
      return clone ? clone : CredentialEntity.getEmpty();
    },
    socialMediaNodesClone: (state) => {
      const profile = state.data;
      return profile ? profile.getSocialMediaNodesClone() : null;
    },
    socialMediaNodesCloneOrEmpty: (state) => {
      const profile = state.data;
      const clone = profile ? profile.getSocialMediaNodesClone() : null;
      return clone ? clone : ([] as ISocialMedias);
    },
    isSynchronized: (state) => {
      return computed(() => state.dataState === PROFILE_STORE_STATE.FULLFILLED);
    },
    isInitial: (state) => {
      return computed(() => state.dataState === PROFILE_STORE_STATE.INITIAL);
    },
  },
  actions: {
    async synchronizeDefault(force = false) {
      if (this.$state.data && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.data) return;

      this.$state.dataState = PROFILE_STORE_STATE.PENDING_REMOTE;
      const fetched = await ProfileStoreApi.getProfileDefault();
    },
    async synchronizeById(profileId: string, force = false) {
      if (this.$state.data && !force) return;

      await this.synchronizeWithSessionStorage();
      if (this.$state.data) return;

      this.$state.dataState = PROFILE_STORE_STATE.PENDING_REMOTE;
      const fetched = await ProfileStoreApi.getProfile(profileId);
    },
    synchronizeWithSessionStorage(force = false) {
      if (
        !force &&
        this.$state.dataState !== PROFILE_STORE_STATE.INITIAL &&
        this.$state.dataState !== PROFILE_STORE_STATE.ERROR
      ) {
        return;
      }
      this.$state.dataState = PROFILE_STORE_STATE.PENDING_BROWSER_STORAGE;
      const sessionProfile = extractProfileSessionStorage();

      if (sessionProfile) {
        this.$state.data = sessionProfile;
      } else {
        this.$state.data = null;
      }
      this.$state.dataState = PROFILE_STORE_STATE.FULLFILLED;
    },
    async storeSessionStorage() {
      const profile = this.$state.data;
      if (profile) {
        pushProfileSessionStorage(profile).then(() => {
          this.$state.dataState = PROFILE_STORE_STATE.FULLFILLED;
        });
      } else {
        clearProfileSessionStorage().then(() => {
          this.$state.dataState = PROFILE_STORE_STATE.FULLFILLED;
        });
      }
    },
  },
});

//
// EVENTS
//
const profileStore = useProfileStore();
watch(profileStore.isSynchronized, async (newValue, oldValue) => {
  if (newValue) {
    profileStoreEventEmitter.emit(PROFILE_STORE_EVENT.FULLFILLED);
  }
});

profileStoreEventEmitter.on(PROFILE_STORE_EVENT.PROFILE_NOT_DEFINED, () => {
  profileStore.synchronizeWithSessionStorage();
});
profileStoreEventEmitter.on(
  PROFILE_STORE_EVENT.UPLOAD_PROFILE_NESTED_SUCCESS,
  (data) => {
    const profile = data as ProfileEntity;
    profileStore.$state.data = profile;
    profileStore.storeSessionStorage();
  }
);
profileStoreEventEmitter.on(
  PROFILE_STORE_EVENT.UPLOAD_CREDENTIAL_SUCCESS,
  (data) => {
    const credential = data as CredentialEntity;
    if (profileStore.$state.data) {
      profileStore.$state.data.credential = credential;
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
    if (profileStore.$state.data) {
      profileStore.$state.data.socialMediaNodes = socialMediaNodes;
      profileStore.storeSessionStorage();
    } else {
      //TODO:
    }
  }
);
profileStoreEventEmitter.on(PROFILE_STORE_EVENT.GET_PROFILE_SUCCESS, (data) => {
  const profile = data as ProfileEntity;
  profileStore.$state.data = profile;
  profileStore.storeSessionStorage();
});
profileStoreEventEmitter.on(PROFILE_STORE_EVENT.DELETE_PROFILE_SUCCESS, () => {
  profileStore.$state.data = null;
  profileStore.storeSessionStorage();
});
