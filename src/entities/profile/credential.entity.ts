import { IBirthday, ICredential, ICredentialEdit } from 'src/interfaces';

export class CredentialEntity implements ICredential {
  id?: string;
  profileId?: string;
  firstName: string;
  lastName: string;
  birthday: Date | null;

  constructor(credential: ICredential) {
    this.id = credential.id;
    this.profileId = credential.profileId;
    this.firstName = credential.firstName;
    this.lastName = credential.lastName;
    this.birthday = credential.birthday;
    // this.birthday = new Date();
  }

  public getPublic(): Omit<ICredential, 'id' | 'profileId'> {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.birthday,
    };
  }

  public getFirstName() {
    const data = this.firstName;
    return data && data.length > 0 ? data : 'Not Given';
  }
  public getLastName() {
    const data = this.lastName;
    return data && data.length > 0 ? data : 'Not Given';
  }
  public getFullNameOrEmpty() {
    const firstName = this.firstName;
    const lastName = this.lastName;
    return firstName && lastName && firstName.length > 0 && lastName.length > 0
      ? firstName + ' ' + lastName
      : '';
  }
  public getFullName() {
    const data = this.getFullNameOrEmpty();
    return data.length > 0 ? data : 'Not Given';
  }

  public getBirthdayString(separator = '.') {
    if (this.birthday) {
      return (
        this.birthday.getFullYear() +
        separator +
        (this.birthday.getMonth() + 1) +
        separator +
        this.birthday.getDate()
      );
    } else {
      return 'Not Given';
    }
  }
  public static getEmpty() {
    return new CredentialEntity({
      firstName: '',
      lastName: '',
      birthday: null,
    });
  }
}

export class CredentialEditEntity implements ICredentialEdit {
  id?: string | undefined;
  profileId?: string | undefined;
  firstName: string;
  lastName: string;
  birthday: IBirthday = { day: null, month: null, year: null };

  constructor(credentialEntity: CredentialEntity) {
    this.id = credentialEntity.id;
    this.profileId = credentialEntity.profileId;
    this.firstName = credentialEntity.firstName;
    this.lastName = credentialEntity.lastName;
    this.setBirthday(credentialEntity.birthday);
  }

  public setBirthday(date: Date | null) {
    if (date) {
      this.birthday = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    } else {
      this.birthday = {
        day: null,
        month: null,
        year: null,
      };
    }
  }

  public getBirthdayDate() {
    if (
      !this.birthday ||
      !this.birthday.day ||
      !this.birthday.month ||
      !this.birthday.year
    )
      return null;
    const yearStr = this.birthday.year.toString().padStart(4, '0');
    const monthStr = this.birthday.month.toString().padStart(2, '0');
    const dayStr = this.birthday.day.toString().padStart(2, '0');
    const date = new Date(`${yearStr}-${monthStr}-${dayStr}T00:00:00Z`);
    if (
      date.getFullYear() === this.birthday.year &&
      date.getMonth() === this.birthday.month - 1 &&
      date.getDate() === this.birthday.day
    ) {
      return date;
    }
    return null;
  }

  public getCredentialEntity() {
    return new CredentialEntity({
      id: this.id,
      profileId: this.profileId,
      firstName: this.firstName,
      lastName: this.lastName,
      birthday: this.getBirthdayDate(),
    });
  }

  public static getEmpty() {
    return new CredentialEditEntity(CredentialEntity.getEmpty());
  }
}
