export const PROFILE_INPUT_MAX_LENGTH = 50;

export const PROJECT_CREATION_YEAR = 2023;
export const MIN_AGE = 7;
export const MIN_BIRTH_YEAR = 1950;
export const MAX_BIRTH_YEAR =
  new Date().getFullYear() >= PROJECT_CREATION_YEAR
    ? new Date().getFullYear() - MIN_AGE
    : PROJECT_CREATION_YEAR - MIN_AGE;
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const NOT_GIVEN_OPTION = {
  label: 'Not Given',
  value: null,
} as INumericNullableQSelectOption;

function* generateNumberStringsOptionsRange(from: number, to: number) {
  if (from > to) [from, to] = [to, from];

  const strLength = to.toString().length;

  for (let i = from; i <= to; i++) {
    const strValue = i.toString().padStart(strLength, '0');
    yield { label: strValue, value: i } as INumericNullableQSelectOption;
  }
}

function* generateMonthsOptionsRange() {
  const from = 1;
  const to = 12;
  for (let i = from; i <= to; i++) {
    const strValue = MONTHS[i - 1];
    yield { label: strValue, value: i } as INumericNullableQSelectOption;
  }
}

export const days = Array.from(generateNumberStringsOptionsRange(1, 31));
days.unshift(NOT_GIVEN_OPTION);
export const months = Array.from(generateMonthsOptionsRange());
months.unshift(NOT_GIVEN_OPTION);
export const birth_years = Array.from(
  generateNumberStringsOptionsRange(MIN_BIRTH_YEAR, MAX_BIRTH_YEAR)
);
birth_years.unshift(NOT_GIVEN_OPTION);

export interface INumericNullableQSelectOption {
  label: string;
  value: number | null;
}
