import { useEffect, useState } from 'react';
import CustomModal from '../../../Shared/CustomComponents/CustomModal/EditLabel';
import Notes from '../../../Views/Notes';
import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';
import Sidebar from './Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<string>('25%');
  const handleClick = (e: MouseEvent) => {
    const nearestDiv = (e.target as Element).closest('div');
    // const sidebar = document.getElementById('sidebar');
    if (nearestDiv?.id === 'Edit Labels') {
      setShowModal((prevShowModal) => !prevShowModal);
    }
    // if (nearestDiv) {
    //   document.querySelectorAll('#sidebar > div').forEach((div) => {
    //     div.classList.remove('bg-[#7F56D9]', 'text-white');
    //   });
    //   if (sidebar?.contains(nearestDiv) && nearestDiv.id !== 'sidebar')
    //     nearestDiv.classList.add('bg-[#7F56D9]', 'text-white');
    // }
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
  return (
    <>
      <NoteNavbar setSidebarWidth={setSidebarWidth} />
      <div className="flex h-full mt-20 dark:bg-gray-700">
        <Sidebar />
        <div
          className="flex-1 flex flex-col transition-all duration-300 ease-in-out dark:bg-gray-600 dark:border-2"
          id="body"
        >
          <Notes />
          {children}
        </div>
      </div>
      {showModal && <CustomModal setShowModal={setShowModal} />}
    </>
  );
}

export default PrivateLayout;
