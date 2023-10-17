import { IAvatar } from './avatar.interface';
import { ICredential } from './credentials.interface';
import { ISocialMedias } from './social-medias.interface';

// export type ProfileDefaults = Omit<IProfile, 'skills'>

export interface IProfile {
  id: string;
  userId: string;
  isDefault?: boolean;
  socialMediaNodes?: ISocialMedias;
  credential?: ICredential | null;
}
