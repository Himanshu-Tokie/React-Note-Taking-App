import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { THEME } from '../../Shared/Constants';
import { updateTheme } from '../../Store/Common';
import { AppLayoutProps } from './AppLayout.d';
import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';

function AppLayout({ isAuthenticated, children }: AppLayoutProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    const storageKey = 'persist:root';
    const jsonString = localStorage.getItem(storageKey);
    if (jsonString) {
      const outerData = JSON.parse(jsonString);
      const commonData = JSON.parse(outerData.common);
      const { theme } = commonData;
      // console.log(theme,'asda');
      if (theme === THEME.DARK) {
        document.body.classList.add('dark');
        dispatch(updateTheme(THEME.DARK));
      } else {
        document.body.classList.remove('dark');
        dispatch(updateTheme(THEME.LIGHT));
      }
    }
  }, [dispatch]);
  return isAuthenticated ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
}

export default AppLayout;
