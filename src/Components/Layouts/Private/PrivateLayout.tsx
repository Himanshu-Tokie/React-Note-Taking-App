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
      if (window.innerWidth > 600) body.style.marginLeft = sidebarWidth;
      else body.style.marginLeft = '60px';
    }
  }, [sidebarWidth]);
  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`${location.pathname}?search=${e.target.value}`, {
      replace: true,
    });
  };
  return (
    <>
      <NoteNavbar setSidebarWidth={setSidebarWidth} search={search} />
      <div className="flex mt-14 sm:mt-20 dark:bg-[#1E1E1E]">
        <Sidebar />
        <div
          className="flex-1 flex flex-col transition-all duration-300 ease-in-out dark:bg-[#252526] dark:border-[#5F6368] h-lvh overflow-auto px-4"
          id="body"
        >
          <Notes />
          <div className=" dark:bg-[#252526]">{children}</div>
        </div>
      </div>
      {showModal && <CustomModal setShowModal={setShowModal} />}
    </>
  );
}

export default PrivateLayout;
