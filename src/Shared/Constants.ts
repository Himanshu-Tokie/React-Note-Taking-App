const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/homePage',
  LOGIN: '/login',
  Reminder: '/reminder',
  Label: '/label/:labelId',
  SIGN_UP: '/signup',
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

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG, NOTES };
