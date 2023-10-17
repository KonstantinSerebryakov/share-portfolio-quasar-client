import { ProfileEntity } from 'src/entities';
import { IProfile } from 'src/interfaces';

const SESSION_STORAGE_KEY = 'profile-store';

export async function pushProfileSessionStorage(profile: IProfile) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
}

export function extractProfileSessionStorage() {
  const json = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!json) return null;

  const profile = JSON.parse(json) as IProfile;
  if (profile.credential && profile.credential.birthday) {
    const dateStr = profile.credential.birthday.toString();
    profile.credential.birthday = new Date(dateStr);
  }
  console.log(profile);
  return new ProfileEntity(profile);
}

export async function clearProfileSessionStorage() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
  // sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(null));
}
