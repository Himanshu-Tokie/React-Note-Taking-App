import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../Services/Config/Firebase/firebase';
import { THEME } from '../../../../Shared/Constants';
import Cards from '../../../../Shared/CustomCards';
import { updateAuthTokenRedux } from '../../../../Store/Common';
import { setLoading } from '../../../../Store/Loader';
import ICONS from '../../../../assets';
import { noteNavbarProps } from './types';

function NoteNavbar({ setSidebarWidth, search }: noteNavbarProps) {
  const [themeVisible, setThemeVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<THEME>(THEME.SYSTEM);
  function toggleSettings() {
    setThemeVisible(!themeVisible);
  }
  function toggleProfile() {
    setProfileVisible(!profileVisible);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleSettings();
    }
  }
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (showSidebar) {
        setShowSidebar(false);
        sidebar.style.width = '60px';
        setSidebarWidth('60px');
        sidebar.style.overflow = 'hidden';
      } else {
        sidebar.style.width = '250px';
        setShowSidebar(true);
        setSidebarWidth('250px');
      }
    }
  };
  const logOut = () => {
    dispatch(setLoading(true));
    signOut(auth);
    dispatch(updateAuthTokenRedux(null));
  };
  const setThemeHandler = (selectedTheme: THEME) => {
    setTheme(selectedTheme);
    setThemeVisible(false);
  };
  const getThemeIcon = () => {
    switch (theme) {
      case THEME.LIGHT:
        return <img src={ICONS.LIGHT_MODE} alt="light" className="h-full" />;
      case THEME.DARK:
        return <img src={ICONS.DARK_MODE} alt="dark" className="h-full" />;
      default:
        return <img src={ICONS.COMPUTER} alt="system" className="h-full" />;
    }
  };
  return (
    <>
      <div className="fixed w-full bg-white top-0 z-[35] dark:bg-gray-700">
        <header className="flex justify-between pr-5 pl-4 pt-2">
          <div className="flex py-2 items-center">
            <div
              onClick={toggleSidebar}
              className="md:p-2"
              role="button"
              tabIndex={0}
              onKeyUp={handleKeyDown}
            >
              <img src={ICONS.MENU} alt="menu" />
            </div>
            <img src={ICONS.DIARY} alt="menu" className="h-16 opacity-100" />
            <p className="md:pl-2 place-content-center text-xl">NoteHub</p>
          </div>
          <div className="hidden md:flex border-2 items-center px-2 rounded-lg h-fit self-center">
            <img src={ICONS.SEARCH} alt="settings" className="h-6" />
            <input
              placeholder="Search"
              className="outline-0 px-3 w-96 py-3"
              // onChange={(e) => setSearchParams({ search: e.target.value })}
              onChange={search}
            />
            <img src={ICONS.CLOSE} alt="settings" className="h-6" />
          </div>

          <div className="flex items-center">
            <img src={ICONS.SEARCH} alt="user" className="h-7 pl-3 md:hidden" />
            <div
              className="h-7 pl-5 cursor-pointer"
              onClick={toggleSettings}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {getThemeIcon()}
            </div>
            <div
              className="h-7 ml-5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-full"
              onClick={toggleProfile}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <img src={ICONS.USER} alt="user" className="h-7" />
            </div>
          </div>
        </header>
        <hr />
      </div>
      {themeVisible && (
        <div className="fixed right-6 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700">
          <ul className="py-2">
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.LIGHT}
                onClick={() => setThemeHandler(THEME.LIGHT)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.LIGHT_MODE} alt="light" />
                <p className="pl-2">Light</p>
              </div>
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.DARK}
                onClick={() => setThemeHandler(THEME.DARK)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.DARK_MODE} alt="dark" />
                <p className="pl-2">Dark</p>
              </div>
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.SYSTEM}
                onClick={() => setThemeHandler(THEME.SYSTEM)}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.COMPUTER} alt="system" />
                <p className="pl-2">System</p>
              </div>
            </li>
          </ul>
        </div>
      )}
      {profileVisible && (
        <Cards
          name={auth.currentUser?.displayName ?? ''}
          user={auth.currentUser?.email ?? ''}
          signOut={logOut}
        />
      )}
    </>
  );
}

export default NoteNavbar;
