import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppLayout from '../Components/Layouts/AppLayout';
import Spinner from '../Shared/CustomSpinner';
import type { RootState } from '../Store';
import DocumentTitle from './DocumentTitle';
import { authenticatedRoutes, guestRoutes } from './config';

function RootRouter() {
  const guest = useRoutes(guestRoutes);
  const authenticated = useRoutes(authenticatedRoutes);
  const token = useSelector((state: RootState) => state?.common?.token);
  const theme = useSelector((state: RootState) => state?.common?.theme);
  const isAuthenticated = !!token;
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  return (
    <>
      {isLoading && <Spinner />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={theme}
        toastClassName="toast-container"
      />
      <DocumentTitle isAuthenticated={isAuthenticated} />
      <AppLayout isAuthenticated={isAuthenticated}>
        {token ? authenticated : guest}
      </AppLayout>
    </>
  );
}

export default RootRouter;
