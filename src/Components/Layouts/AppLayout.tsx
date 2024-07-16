import { useEffect } from 'react';
import { AppLayoutProps } from './AppLayout.d';
import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';
import { THEME } from '../../Shared/Constants';

function AppLayout({ isAuthenticated, children }: AppLayoutProps) {
  useEffect(() => {
    const storageKey = 'persist:root';
    const jsonString = localStorage.getItem(storageKey);
    if (jsonString) {
      const outerData = JSON.parse(jsonString);
      const commonData = JSON.parse(outerData.common);
      const { theme } = commonData;
      if (theme === THEME.DARK) document.body.classList.add('dark');
      else document.body.classList.remove('dark');
    }
  }, []);
  return isAuthenticated ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
}

export default AppLayout;
