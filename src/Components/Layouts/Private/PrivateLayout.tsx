import { useEffect, useState } from 'react';
import CustomModal from '../../../Shared/CustomComponents/CustomModal/EditLabel';
import Notes from '../../../Views/Notes';
import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';
import Sidebar from './Sidebar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClick = (e: MouseEvent) => {
    const nearestDiv = (e.target as Element).closest('div');
    const sidebar = document.getElementById('sidebar');
    if (nearestDiv?.id === 'Edit Labels') {
      setShowModal((prevShowModal) => !prevShowModal);
    }
    if (nearestDiv) {
      document.querySelectorAll('#sidebar > div').forEach((div) => {
        div.classList.remove('bg-[#7F56D9]', 'text-white');
      });
      if (sidebar?.contains(nearestDiv) && nearestDiv.id !== 'sidebar')
        nearestDiv.classList.add('bg-[#7F56D9]', 'text-white');
    }
  };
  useEffect(() => {
    const tag = document.getElementById('sidebar');
    tag?.addEventListener('click', handleClick);
    return () => {
      tag?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <NoteNavbar />
      <div className="flex h-screen mt-20">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Notes />
          {children}
        </div>
      </div>
      {showModal && <CustomModal setShowModal={setShowModal} />}
    </>
  );
}

export default PrivateLayout;
