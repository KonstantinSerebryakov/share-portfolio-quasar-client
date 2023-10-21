import { api } from 'src/boot/axios';
import {
  CredentialEntity,
  ProfileEntity,
  SocialMediaNodeEntity,
} from 'src/entities';
import { ICredential, IProfile, ISocialMedias } from 'src/interfaces';
import {
  PROFILE_STORE_EVENT,
  profileStoreEventEmitter,
} from 'src/stores/profile-store';

export class ProfileStoreApi {
  static async getProfile(profileId: string) {
    const URL = `profiles/profile/${profileId}`;
    const profile = await this.fetchApiGet<IProfile>(URL);
    const profileEntity = new ProfileEntity(profile);
    profileStoreEventEmitter.emit(
      PROFILE_STORE_EVENT.GET_PROFILE_SUCCESS,
      profile
    );
    return profileEntity;
  }
  static async getProfilesList() {
    const URL = 'profiles/list/essential';
    const profiles = await this.fetchApiGet<IProfile[]>(URL, 'profiles');
    const entities = profiles.map((profile) => new ProfileEntity(profile));
    return entities;
  }
  static async getProfileDefault() {
    const URL = 'profiles/default';
    const profile = await this.fetchApiGet<IProfile>(URL);
    const profileEntity = new ProfileEntity(profile);
    profileStoreEventEmitter.emit(
      PROFILE_STORE_EVENT.GET_PROFILE_SUCCESS,
      profileEntity
    );
    return profileEntity;
  }
  static async updateProfile(profileId: string, profile: ProfileEntity) {
    const URL = `profiles/profile/${profileId}/`;
    const fetched = await this.fetchApiPut<IProfile>(URL, profile);
    profileStoreEventEmitter.emit(
      PROFILE_STORE_EVENT.UPLOAD_PROFILE_NESTED_SUCCESS,
      profile
    );
    return fetched;
  }
  static async updateCredential(
    profileId: string,
    credential: CredentialEntity
  ) {
    const URL = `profiles/profile/${profileId}/credential`;
    const fetched = await this.fetchApiPut<ICredential>(URL, credential);
    profileStoreEventEmitter.emit(
      PROFILE_STORE_EVENT.UPLOAD_CREDENTIAL_SUCCESS,
      credential
    );
    return fetched;
  }
  static async updateSocialMediaNodes(
    profileId: string,
    socialMediaNodes: SocialMediaNodeEntity[]
  ) {
    const URL = `profiles/profile/${profileId}/social-media-nodes`;
    const fetched = await this.fetchApiPost<ISocialMedias>(
      URL,
      socialMediaNodes
    );
    profileStoreEventEmitter.emit(
      PROFILE_STORE_EVENT.UPLOAD_SOCIAL_MEDIA_NODES_SUCCESS,
      socialMediaNodes
    );
    return fetched;
  }
  static async deleteProfile(profileId: string) {
    const URL = `profiles/profile/${profileId}`;
    const fetched = await this.fetchApiDelete(URL);
    profileStoreEventEmitter.emit(PROFILE_STORE_EVENT.DELETE_PROFILE_SUCCESS);
    return fetched;
  }
  static async createProfile() {
    const URL = 'profiles/new';
    const fetched = await this.fetchApiPost(URL);
    return fetched;
  }

  //
  // FETCH AXIOS
  //
  private static async fetchApiGet<T>(
    URL: string,
    key = 'profile'
  ): Promise<T> {
    const data = await api.get(URL).then((response) => {
      if (response.status === 200) {
        return response.data[key];
      }
      throw new Error(`${response.status}`);
    });
    return data as T;
  }
  private static async fetchApiPost<T extends ISocialMedias>(
    URL: string,
    payload?: T
  ) {
    const data = await api.post(URL, payload).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      throw new Error(`${response.status}`);
    });
    return data;
  }
  private static async fetchApiPut<T extends ICredential | IProfile>(
    URL: string,
    payload: T
  ) {
    const data = await api.put(URL, payload).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      throw new Error(`${response.status}`);
    });
    return data;
  }
  private static async fetchApiDelete(URL: string) {
    const data = await api.delete(URL).then((response) => {
      if (response.status === 200 || response.status === 204) {
        return true;
      }
      throw new Error(`${response.status}`);
    });
    return data;
  }
}
