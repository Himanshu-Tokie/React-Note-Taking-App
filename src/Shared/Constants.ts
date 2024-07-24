const ROUTES = {
  HOMEPAGE: '/homePage',
  LOGIN: '/login',
  Reminder: '/reminder',
  Label: '/label/:labelId',
  SIGN_UP: '/signup',
  FORGOT_PASSWORD: '/forgotpassword',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Home',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  Reminder: {
    path: ROUTES.Reminder,
    title: 'Reminder',
  },
  Label: {
    path: ROUTES.Label,
    title: 'label',
  },
  SIGN_UP: {
    path: ROUTES.SIGN_UP,
    title: 'Sign up',
  },
  FORGOT_PASSWORD: {
    path: ROUTES.FORGOT_PASSWORD,
    title: 'Forgot Password',
  },
};

const NOTES = {
  PERSONAL: {
    NAME: 'Personal',
    TITLE: 'Meeting Notes',
    CONTENT: 'Discussion points: project updates, deadlines, action items',
  },
  ACADEMICS: {
    NAME: 'Academic',
    TITLE: 'Meeting Notes',
    CONTENT: 'Discussion points: project updates, deadlines, action items',
  },
  WORK: {
    NAME: 'Work',
    TITLE: 'Meeting Notes',
    CONTENT: 'Discussion points: project updates, deadlines, action items',
  },
  OTHERS: {
    NAME: 'Others',
    TITLE: 'Meeting Notes',
    CONTENT: 'Discussion points: project updates, deadlines, action items',
  },
};

enum THEME {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  SYSTEM = 'SYSTEM',
}

const ERROR = {
  INVALID_CREDENTIALS: 'Invalid Credentials',
  POPUP_CLOSED: 'Sign-in interrupted.',
};

const STRINGS = {
  PROFILE: 'Profile Picture',
  SELECT_FILE: 'Select a file',
  ERROR: 'Some error occured please try again',
  SIGNUP_MESSAGE: 'Welcome! Your sign-up is successful!',
  PROFILE_INSTRUCTION:
    "A picture helps people recognize you and lets you know when you'resigned in to your account",
  EDIT: 'Change Photo',
  RESET_LINK: 'Reset link sent',
  RESET_LINK_FAILED: 'Some issue please try again',
  TITLE: 'Title',
  EMPTY: 'temporarily empty',
  SEARCH: 'search',
  CREATE_NOTES: 'Create new notes.....',
  SELECT_LABEL: 'Select Label',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  NO_REMINDER: 'No Reminder',
  SIGN_OUT: 'Sign Out',
  EDIT_NOTES: 'Edit Note',
  EDIT_LABELS: 'Edit Labels',
  DELETE: 'Delete',
  EMPTY_LABEL: '*Empty label',
  LABLE_NOT_EMPTY: "Label Can't be empty",
  LABEL_EXISTS: '*Label exists already',
  YES: 'Yes, I am sure',
  GOOGLE_SIGNIN: 'Sign in with Google',
  WELCOME1: 'Welcome Back!',
  WELCOME2: 'Welcome!',
  FORGOT_PASSWORD: 'Forgot Password ?',
  FORGOT_PASSWORD_INSTRUCTIONS:
    'Enter the email address you used when you joined and we’ll send you link to reset your password.',
  WELCOME_MESSAGE: 'Happy to connect with you',
  NOTE_TAKING_APP: {
    PART1: 'Note-Ta',
    PART2: 'king App',
  },
  EMAIL: 'Email Address',
  PASSWORD: 'Password',
  CONFIRM_PASSWORD: 'Confirm Password',
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  SIGN_IN: 'Sign in',
  SIGN_UP: 'Sign up',
  RESET_PASSWORD: 'Send Reset Link',
  LOG_IN: 'Log in',
  CREATE_ACCOUNT: 'Create Account',
  HAVE_ACCOUNT: 'Already have an account? ',
  DONT_HAVE_ACCOUNT: "Don't have an account? ",
};

const FIREBASE_STRINGS = {
  USER: 'user',
  LABELS: 'labels',
  NOTES: 'notes',
  LABEL: 'label',
  ERROR: {
    INVALID_CREDENTIALS: 'auth/invalid-credential',
    DEFAULT: 'Some error occured please try again',
    POPUP_CLOSED: 'auth/popup-closed-by-user',
  },
};

const AUTHENTICATION = {
  PLACEHOLDER: {
    FIRST_NAME: 'Enter your first name',
    LAST_NAME: 'Enter your last name',
    EMAIL: 'Enter your email address',
    PASSWORD: 'Enter your password',
    CONFIRM_PASSWORD: 'Confirm your password',
  },
  ID: {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
  },
  TYPE: {
    PASSWORD: 'password',
    SUBMIT: 'submit',
  },
};
export {
  AUTHENTICATION,
  FIREBASE_STRINGS,
  NOTES,
  ROUTES,
  ROUTES_CONFIG,
  STRINGS,
  THEME,
  WILDCARD_ROUTES,
  ERROR,
};
