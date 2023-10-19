import { IBirthday } from 'src/interfaces';
import { PROFILE_INPUT_MAX_LENGTH } from 'src/services/utility/constants';

export class CredentialValidation {
  public static isFirstNameValid(firstName: string): boolean {
    return firstName.length <= PROFILE_INPUT_MAX_LENGTH;
  }
  public static isLastNameValid(lastName: string): boolean {
    return lastName.length <= PROFILE_INPUT_MAX_LENGTH;
  }
  public static isBirthdayFilled(birthday: IBirthday): boolean {
    const day = birthday.day;
    const month = birthday.month;
    const year = birthday.year;
    if (
      (day === null || month === null || year === null) &&
      !(day === month && month === year)
    )
      return false;
    return true;
  }
}
