import { IUser } from 'src/interfaces';

export class UserEntity implements IUser {
  id?: string;
  email: string;
  isVerified: boolean;
  passwordHash?: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.isVerified = user.isVerified;
    this.passwordHash = user.passwordHash;
  }

  public getPublic(): Omit<IUser, 'id' | 'passwordHash'> {
    return {
      email: this.email,
      isVerified: this.isVerified,
    };
  }
}
