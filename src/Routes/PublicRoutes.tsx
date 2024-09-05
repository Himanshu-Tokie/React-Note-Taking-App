import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import ForgotPassword from '../Views/Authentication/ForgotPassword';
import Login from '../Views/Authentication/LogIn';
import SignUp from '../Views/Authentication/SignUp';
import { CustomRouter } from './RootRoutes';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
  {
    path: `${ROUTES_CONFIG.SIGN_UP.path}`,
    title: ROUTES_CONFIG.SIGN_UP.title,
    element: <SignUp />,
  },
  {
    path: `${ROUTES_CONFIG.FORGOT_PASSWORD.path}`,
    title: ROUTES_CONFIG.FORGOT_PASSWORD.title,
    element: <ForgotPassword />,
  },
];
