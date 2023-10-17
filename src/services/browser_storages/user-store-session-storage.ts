import { UserEntity } from 'src/entities';
import { IUser } from 'src/interfaces';

const SESSION_STORAGE_KEY = 'user-store';

export async function pushUserSessionStorage(user: IUser) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export async function extractUserSessionStorage() {
  const json = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!json) return null;

  const user = JSON.parse(json) as IUser;
  return new UserEntity(user);
}

export async function clearUserSessionStorage() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  // sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(null));
}
