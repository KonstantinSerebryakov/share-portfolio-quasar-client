export interface ICredential {
  id?: string;
  profileId?: string;
  firstName: string;
  lastName: string;
  birthday: Date | null;
}

export interface ICredentialEdit extends Omit<ICredential, 'birthday'> {
  birthday: IBirthday | null;
}

export interface IBirthday {
  day: number | null;
  month: number | null;
  year: number | null;
}
