const YUP_STRINGS = {
  INVALID_EMAIL: 'Invalid email',
  INVALID_PASSWORD:
    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  PASSWORD_NOT_MATCH: "Password doesn't match",
  INVALID_FIRST_NAME: 'Invalid first name',
  INVALID_LAST_NAME: 'Invalid last name',
  ENTER_EMAIL: 'Please enter email',
  ENTER_PASSWORD: 'Please enter your password',
  PHONE_NUMBER_WARNING1: 'Number must be exactly 10 digits',
  PHONE_NUMBER_WARNING2: 'Enter Number',
  FIRST_NAME_WARNING: 'Please enter your first name',
  LAST_NAME_WARNING: 'Please enter your last name',
  EMAIL_WARNING: 'Please enter email',
  PASSWORD_WARNING: 'Please enter your password',
  PASSWORD_SMALL: 'password',
  CONFIRM_PASSWORD: 'Please confirm password',
} as const;

export default YUP_STRINGS;
