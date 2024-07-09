import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../../Services/Config/Firebase/firebase';
import { updateAuthTokenRedux } from '../../../../Store/Common';
import { setLoading } from '../../../../Store/Loader';
import { noteNavbarProps } from './types';
import ICONS from '../../../../assets';

function NoteNavbar({ setSidebarWidth }: noteNavbarProps) {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();
  function toggleSettings() {
    setSettingsVisible(!settingsVisible);
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
        sidebar.style.width = '5%';
        sidebar.style.overflow = 'hidden';
        setShowSidebar(false);
        setSidebarWidth('5%');
      } else {
        sidebar.style.width = '20%';
        setShowSidebar(true);
        setSidebarWidth('20%');
      }
    }
  };
  const logOut = () => {
    dispatch(setLoading(true));
    signOut(auth);
    dispatch(updateAuthTokenRedux(''));
  };
  return (
    <>
      <div className="fixed w-full bg-white top-0 z-[100] dark:bg-gray-700">
        <header className="flex justify-between pr-5 pl-4 pt-2 ">
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
            <input placeholder="Search" className="outline-0 px-3 w-72 py-3" />
            <img src={ICONS.CLOSE} alt="settings" className="h-6" />
          </div>

          <div className="flex items-center">
            <img src={ICONS.SEARCH} alt="user" className="h-7 pl-3 md:hidden" />
            <img src={ICONS.LIST_VIEW} alt="user" className="h-7 pl-5" />
            <div
              className="h-7 pl-5 cursor-pointer"
              onClick={toggleSettings}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <img src={ICONS.SETTINGS} alt="settings" className="h-full" />
            </div>
            <div
              className="h-7 pl-5 cursor-pointer"
              onClick={toggleProfile}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <img src={ICONS.USER} alt="user" className="h-7" />
            </div>

            {/* <img src="src/assets/grid_view.svg" alt="user"/> */}
          </div>
        </header>
        <hr />
      </div>
      {settingsVisible && (
        <div className="absolute right-11 top-20 bg-white shadow-md z-50">
          <ul className="py-2">
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              Theme
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              Setting
            </li>
            <div
              className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logOut}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              <li className="">SignOut</li>
            </div>
          </ul>
        </div>
      )}
      {profileVisible && (
        <div className="absolute right-2 top-20 bg-white shadow-md z-50">
          <img
            src={ICONS.DEFAULT_PROFILE}
            alt="default profile"
            className="px-5 py-2"
          />
          <div className="px-5 py-2 cursor-pointer">
            <h3>{auth.currentUser?.displayName}</h3>
            <p>{auth.currentUser?.email}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteNavbar;
