import { UserEntity } from 'src/entities';
import { IUser } from 'src/interfaces';

const STORAGE_KEY = 'user-store';

export async function pushUserLocalStorage(user: IUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function extractUserLocalStorage() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return null;

  const user = JSON.parse(json) as IUser;
  return new UserEntity(user);
}

export async function clearUserLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
  // localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(null));
}
