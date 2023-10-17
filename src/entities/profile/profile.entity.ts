import { IProfile } from 'src/interfaces';
import { SocialMediaNodeEntity } from './socialMediaNode.entity';
import { CredentialEntity } from './credential.entity';

export class ProfileEntity implements IProfile {
  id: string;
  userId: string;
  socialMediaNodes?: SocialMediaNodeEntity[];
  credential?: CredentialEntity | null;

  constructor(profile: IProfile) {
    this.id = profile.id;
    this.userId = profile.userId;
    this.socialMediaNodes = profile.socialMediaNodes?.map((socialMedia) => {
      return new SocialMediaNodeEntity(socialMedia);
    });
    if (profile.credential)
      this.credential = new CredentialEntity(profile.credential);
  }

  public getPublicSelf(): Omit<IProfile, 'id' | 'socialMedias' | 'credential'> {
    return {
      userId: this.userId,
    };
  }

  public getPublicNested(): Omit<IProfile, 'id'> {
    return {
      userId: this.userId,
      socialMediaNodes: this.socialMediaNodes?.map((SocialMediaEntity) =>
        SocialMediaEntity.getPublicNested()
      ),
      credential: this.credential?.getPublic(),
    };
  }

  public getCredentialClone() {
    return this.credential
      ? new CredentialEntity(this.credential)
      : this.credential;
  }

  public getSocialMediaNodesClone() {
    return this.socialMediaNodes
      ? this.socialMediaNodes.map((node) => new SocialMediaNodeEntity(node))
      : this.socialMediaNodes;
  }
}
