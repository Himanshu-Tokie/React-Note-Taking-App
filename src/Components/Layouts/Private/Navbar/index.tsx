import { signOut } from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../../Services/Config/Firebase/firebase';
import { ROUTES, THEME } from '../../../../Shared/Constants';
import Cards from '../../../../Shared/CustomCards';
import PopUpMessage from '../../../../Shared/CustomComponents/CustomModal/PopUp';
import { updateAuthTokenRedux, updateTheme } from '../../../../Store/Common';
import { setLoading } from '../../../../Store/Loader';
import { stateType } from '../../../../Views/Dashboard/types';
import ICONS from '../../../../assets';
import { noteNavbarProps } from './types';

function NoteNavbar({ setSidebarWidth, search }: noteNavbarProps) {
  const [themeVisible, setThemeVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const storedDarkMode = localStorage.getItem('Theme') as THEME;
  // const [theme, setTheme] = useState<THEME>(storedDarkMode ?? THEME.DARK);
  const theme = useSelector((state: stateType) => state.common.theme);

  const themeElementRef = useRef<HTMLDivElement | null>(null);
  const profileElementRef = useRef<HTMLDivElement | null>(null);
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
  const adjustSidebarWidth = useCallback(() => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (window.innerWidth < 600) {
        sidebar.style.width = '60px';
        setSidebarWidth('60px');
        setShowSidebar(false);
      } else {
        sidebar.style.width = '250px';
        setSidebarWidth('250px');
        setShowSidebar(true);
      }
    }
  }, [setSidebarWidth]);
  useEffect(() => {
    adjustSidebarWidth();
    window.addEventListener('resize', adjustSidebarWidth);
    return () => {
      window.removeEventListener('resize', adjustSidebarWidth);
    };
  }, [adjustSidebarWidth, setSidebarWidth]);

  const logOut = async () => {
    dispatch(setLoading(true));
    await signOut(auth);
    dispatch(updateAuthTokenRedux(null));
    dispatch(setLoading(false));
  };
  const setThemeHandler = (selectedTheme: THEME) => {
    // setTheme(selectedTheme);
    dispatch(updateTheme(selectedTheme));
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
  const themeToggler = (e: React.MouseEvent<HTMLDivElement>) => {
    setThemeHandler(e.currentTarget.id as THEME);
    if (e.currentTarget.id === THEME.DARK) document.body.classList.add('dark');
    else if (e.currentTarget.id === THEME.LIGHT)
      document.body.classList.remove('dark');
  };
  useEffect(() => {
    if (theme === THEME.DARK) document.body.classList.add('dark');
    else if (theme === THEME.LIGHT) document.body.classList.remove('dark');
  }, [theme]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!themeElementRef.current?.contains(e.target as Element)) {
        setThemeVisible(false);
      }
      if (!profileElementRef.current?.contains(e.target as Element)) {
        setProfileVisible(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  const searchFocusHandler = () => {
    navigate(ROUTES.HOMEPAGE, { replace: true });
  };
  // const searchBlurHandler = () => {
  //   setTimeout(() => navigate(-2), 0);
  // };
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const appNameRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParams = new URLSearchParams(location.search);
  useEffect(() => {
    setSearchQuery(searchParams.get('search') ?? '');
  }, [searchParams]);
  // const searchQuery = searchParams.get('search');
  const [isExpanded, setIsExpanded] = useState(false);
  const onClickHandler = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {confirmationModal && (
        <PopUpMessage
          setConfirmationModal={setConfirmationModal}
          description="Are you sure want to log out"
          confirmationFunction={logOut}
        />
      )}
      <div className="fixed w-full bg-white top-0 z-[35] dark:bg-[#1E1E1E]">
        <header className="flex justify-between pr-2 sm:pr-5 pl-4 sm:pt-2 border-b-2 dark:border-[#5F6368]">
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
            <img
              src={ICONS.DIARY}
              alt="menu"
              className="h-10 sm:h-16 opacity-100"
            />
            <p
              className={`md:pl-2 place-content-center text-sm sm:text-lg font-bold dark:text-white ${isExpanded ? 'hidden' : 'block'} md:block`}
              ref={appNameRef}
            >
              <span className="text-[#7F56D9]">Note-Ta</span>king App
            </p>
          </div>
          <div className="hidden md:flex border-2 dark:border-[#5F6368] items-center px-2 rounded-lg h-fit self-center dark:bg-[#333333]">
            <img src={ICONS.SEARCH} alt="settings" className="h-6" />
            <input
              placeholder="Search"
              className="outline-0 px-3 w-96 py-3 dark:bg-[#333333] dark:text-gray-300 "
              // onChange={(e) => setSearchParams({ search: e.target.value })}
              onChange={search}
              onFocus={searchFocusHandler}
              defaultValue={searchQuery ?? ''}
              // onBlur={searchBlurHandler}
            />
            <img src={ICONS.CLOSE} alt="settings" className="h-6" />
          </div>
          <div className="flex items-center">
            <div className="flex md:hidden items-center relative">
              <input
                type="text"
                placeholder="Search"
                onChange={search}
                onFocus={searchFocusHandler}
                defaultValue={searchQuery ?? ''}
                className={`outline-none py-2 fixed left-20 sm:left-24 rounded-lg dark:border-[#5F6368] dark:bg-[#333333] dark:text-gray-300 transition-width duration-300 ease-in-out ${
                  isExpanded ? 'w-2/4 sm:4/6 px-3 border-2' : 'w-0'
                }`}
              />
              <div
                onClick={onClickHandler}
                aria-label="search"
                role="button"
                className="self-center ml-1"
              >
                <img
                  src={ICONS.SEARCH}
                  alt="search"
                  className="h-7 md:h-8 cursor-pointer"
                />
              </div>
            </div>
            <div
              className="h-7 ml-1 sm:ml-5 cursor-pointer"
              onClick={toggleSettings}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              id="settings"
              ref={themeElementRef}
            >
              {getThemeIcon()}
            </div>
            <div
              className="h-7 ml-1 sm:ml-5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-full"
              onClick={toggleProfile}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              ref={profileElementRef}
            >
              <img src={ICONS.USER} alt="user" className="h-7" />
            </div>
          </div>
        </header>
      </div>
      {themeVisible && (
        <div
          className="fixed right-6 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-30 dark:bg-gray-700"
          id="themeModal"
        >
          <ul className="pt-2">
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.LIGHT}
                onClick={themeToggler}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.LIGHT_MODE} alt="light" />
                <p className="pl-2 dark:text-gray-300">Light</p>
              </div>
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.DARK}
                onClick={themeToggler}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.DARK_MODE} alt="dark" />
                <p className="pl-2 dark:text-gray-300">Dark</p>
              </div>
            </li>
            {/* <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              <div
                className="flex"
                id={THEME.SYSTEM}
                onClick={themeToggler}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                <img src={ICONS.COMPUTER} alt="system" />
                <p className="pl-2 dark:text-gray-300">System</p>
              </div>
            </li> */}
          </ul>
        </div>
      )}
      {profileVisible && (
        <Cards
          name={auth.currentUser?.displayName ?? ''}
          user={auth.currentUser?.email ?? ''}
          signOut={() => setConfirmationModal(true)}
        />
      )}
    </>
  );
}

export default NoteNavbar;
