import { api } from 'src/boot/axios';
import { UserEntity } from 'src/entities';
import { IUser } from 'src/interfaces';
import { USER_STORE_EVENT, userStoreEventEmitter } from 'src/stores/user-store';

export class UserStoreApi {
  static async getUser(email: string) {
    const URL = 'users/info';
    const user = await this.fetchApiGet<IUser>(URL);
    const userEntity = new UserEntity(user);
    userStoreEventEmitter.emit(USER_STORE_EVENT.GET_USER_SUCCESS, userEntity);
    return userEntity;
  }
  //
  // FETCH AXIOS
  //
  private static async fetchApiGet<T>(URL: string): Promise<T> {
    const data = await api.get(URL).then((response) => {
      if (response.status === 200) {
        return response.data.user;
      }
      throw new Error(`${response.status}`);
    });
    return data as T;
  }
  private static async fetchApiPost<T>(URL: string, payload: T) {
    const data = await api.post(URL, payload).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      throw new Error(`${response.status}`);
    });
    return data;
  }
  private static async fetchApiPut<T>(URL: string, payload: T) {
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
