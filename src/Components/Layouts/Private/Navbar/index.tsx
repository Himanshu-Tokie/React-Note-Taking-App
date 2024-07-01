import { useState } from 'react';

function NoteNavbar() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  function toggleSettings() {
    setSettingsVisible(!settingsVisible);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleSettings();
    }
  }
  return (
    <>
      <header className="opacity-65 flex justify-between pr-5 pl-4 pt-2">
        <div className="flex py-2">
          <img src="src/assets/menu.svg" alt="menu" className="p-2" />
          <img
            src="src/assets/diary.svg"
            alt="menu"
            className="h-16 opacity-100"
          />
          <p className="pl-2 place-content-center text-xl">Note Taking App</p>
        </div>
        <div className="border-2 flex items-center px-2 rounded-lg h-fit self-center">
          <img src="src/assets/search.svg" alt="settings" className="h-6" />
          <input placeholder="Search" className="outline-0 px-3 w-72 py-3" />
          <img src="src/assets/close.svg" alt="settings" className="h-6" />
        </div>
        <div className="flex items-center">
          <img src="src/assets/list_view.svg" alt="user" className="h-7 pl-5" />
          <div
            className="h-7 pl-5 cursor-pointer"
            onClick={toggleSettings}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <img
              src="src/assets/settings.svg"
              alt="settings"
              className="h-full"
            />
          </div>
          <img src="src/assets/user.svg" alt="user" className="h-7 px-5" />
          {/* <img src="src/assets/grid_view.svg" alt="user"/> */}
        </div>
      </header>
      <hr className="my-0" />
      {settingsVisible && (
        <div className="absolute right-11 top-20 bg-white shadow-md z-50">
          <ul className="py-2">
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              Theme
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              Setting
            </li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer px-5">
              SignOut
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NoteNavbar;
