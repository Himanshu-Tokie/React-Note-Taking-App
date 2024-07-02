import { useEffect } from 'react';
import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const handleClick = (e) => {
    const nearestDiv = e.target.closest('div');
    if (nearestDiv) {
      document.querySelectorAll('#sidebar > div').forEach((div) => {
        div.classList.remove('bg-[#7F56D9]', 'text-white');
      });
      nearestDiv.classList.add('bg-[#7F56D9]', 'text-white');
      nearestDiv.classList.remove('hover:bg-gray-100');
    }
  };
  useEffect(() => {
    const tag = document.getElementById('sidebar');
    tag?.addEventListener('click', handleClick);
    return () => {
      tag?.removeEventListener('click', handleClick);
    };
  }, []);
  const label = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
  return (
    <>
      <NoteNavbar />
      <div className="flex h-screen ">
        <div className="xl:w-2/12 mt-3 md:w-1/4 w-60" id="sidebar">
          <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100 ">
            <img
              src="src/assets/lightbulb.svg"
              alt="lightbulb"
              className="p-2"
            />
            <p className="pl-6 text-base">Notes</p>
          </div>
          <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100">
            <img
              src="src/assets/notifications.svg"
              alt="notifications"
              className="p-2"
            />
            <p className="pl-6 text-base">Reminders</p>
          </div>
          {label.map((item) => (
            <div
              key={item.id}
              className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
            >
              <img src="src/assets/label.svg" alt="label" className="p-2" />
              <p className="pl-6 text-base">{item.id}</p>
            </div>
          ))}
          <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100">
            <img src="src/assets/edit.svg" alt="edit" className="p-2" />
            <p className="pl-6 text-base">Edit Labels</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
