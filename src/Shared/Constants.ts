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
    TITLE: 'Personal Notes!',
    CONTENT: 'Note your upcoming plans and goals!',
  },
  ACADEMICS: {
    NAME: 'Academic',
    TITLE: 'Study Notes!',
    CONTENT: 'Add lectures, track assignments, and notes.',
  },
  WORK: {
    NAME: 'Work',
    TITLE: 'Work Notes!',
    CONTENT: 'Track tasks, meetings, and projects here.',
  },
  OTHERS: {
    NAME: 'Others',
    TITLE: 'Miscellaneous Notes!',
    CONTENT: 'Your space for all miscellaneous notes.',
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
  EMAIL_IN_USE: 'auth/email-already-in-use',
  TIME_OUT: 'Timed out',
};

const STRINGS = {
  NO_DATA: 'No matching results.',
  NOTES: 'Notes',
  EDIT_LABELS: 'Edit Labels',
  LOG_OUT_MESSAGE: 'Are you sure you want to logout?',
  TAKE_NOTE: 'Take a note',
  PROFILE: 'Profile Picture',
  SELECT_IMAGE: 'Select image',
  ERROR: 'Some error occured please try again',
  PROFILE_INSTRUCTION: 'Personalize your notes with a new profile image.',
  EDIT: 'Change Photo',
  RESET_LINK: 'Reset link sent',
  RESET_LINK_FAILED: 'Some issue please try again',
  TITLE: 'Title',
  EMPTY: 'temporarily empty',
  SEARCH: 'search',
  CREATE_NOTES: 'No notes with this label yet',
  // CREATE_NOTES: 'Add notes',
  SELECT_LABEL: 'Select Label',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  NO_REMINDER: 'No Reminder',
  SIGN_OUT: 'Sign Out',
  EDIT_NOTES: 'Edit Note',
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
  DELETE_LABEL_DESCRIPTION: 'Deleting lable will delete notes inside too',
};

const TOAST_STRINGS = {
  SELECT_IMAGE: 'Please select an image',
  IMAGE_UPDATED: 'Image updated successfully',
  LABEL_EDIT: 'Label edited successfully',
  LABEL_CREATED: 'Label created successfully',
  LABEL_DELETED: 'Label deleted successfully',
  NOTES_UPDATED: 'Note updated successfully',
  NOTES_CREATED: 'Note created successfully',
  NOTES_DELETED: 'Note deleted successfully',
  EMPTY_NOTES: 'Title and notes are empty',
  SIGNUP_FAILED: 'Signup failed',
  SIGNUP_MESSAGE: 'Welcome! Your sign-up is successful!',
  ERROR_UPLOADING_IMAGE: 'Error uploading image',
  EMAIL_IN_USE: 'Email already used',
  EMPTY_LABEL: 'Label is empty',
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
    TIME_OUT: 'Promise timed out',
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
  AUTHENTICATION, ERROR, FIREBASE_STRINGS,
  NOTES,
  ROUTES,
  ROUTES_CONFIG,
  STRINGS,
  THEME, TOAST_STRINGS, WILDCARD_ROUTES
};

