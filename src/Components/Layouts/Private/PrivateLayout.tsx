/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomModal from '../../../Shared/CustomComponents/CustomModal/EditLabel';
import Notes from '../../../Views/Notes';
import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';
import Sidebar from './Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<string>('250px');
  const handleClick = (e: MouseEvent) => {
    const nearestDiv = (e.target as Element).closest('div');
    if (nearestDiv?.id === 'Edit Labels') {
      setShowModal((prevShowModal) => !prevShowModal);
    }
  };
  useEffect(() => {
    const tag = document.getElementById('sidebar');
    tag?.addEventListener('click', handleClick);
    return () => {
      tag?.removeEventListener('click', handleClick);
    };
  }, []);
  useEffect(() => {
    const body = document.getElementById('body');
    if (body) {
      body.style.marginLeft = sidebarWidth;
    }
  }, [sidebarWidth]);
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(location.search);
    const isFirstSearch = params.get('q') == null;
    navigate(`${location.pathname}?q=${e.target.value}`, {
      replace: !isFirstSearch,
    });
  };

  return (
    <>
      <NoteNavbar setSidebarWidth={setSidebarWidth} search={search} />
      <div className="flex mt-20 dark:bg-gray-700">
        <Sidebar />
        <div
          className="flex-1 flex flex-col transition-all duration-300 ease-in-out dark:bg-gray-600 dark:border-2"
          id="body"
        >
          <Notes />
          <div className="h-dvh">{children}</div>
        </div>
      </div>
      {showModal && <CustomModal setShowModal={setShowModal} />}
    </>
  );
}

export default PrivateLayout;
