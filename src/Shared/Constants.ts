const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/homePage',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about-us',
  SIGN_UP: '/signup',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Master Plan',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About us',
  },
  SIGN_UP: {
    path: ROUTES.SIGN_UP,
    title: 'Sign up',
  },
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
