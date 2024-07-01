import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';
import Login from '../Views/Authentication/LogIn';
import SignUp from '../Views/Authentication/SignUp';

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
];
