import { useEffect, useState } from 'react';
import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';
import { db } from '../../../Services/Config/Firebase/firebase';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  const handleClick = (e) => {
    const nearestDiv = e.target.closest('div');
    if (nearestDiv.id == 'Reminders')
      setReminder(true)
    else {
      setReminder(false)
      setLabel(nearestDiv.id)
    }
    if (nearestDiv) {
      document.querySelectorAll('#sidebar > div').forEach((div) => {
        div.classList.remove('bg-[#7F56D9]', 'text-white');
      });
      nearestDiv.classList.add('bg-[#7F56D9]', 'text-white');
      // nearestDiv.classList.remove('hover:bg-gray-100');
    }
  };

  const [data, setData] = useState<{ id: string; }[]>();
  const [label, setLabel] = useState<string>();
  const [reminder, setReminder] = useState<boolean>();

  const uid = useSelector(state => state.common.uid)

  useEffect(() => {
    const tag = document.getElementById('sidebar');
    tag?.addEventListener('click', handleClick);
    return () => {
      tag?.removeEventListener('click', handleClick);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const parentDocRef = doc(db, 'user', uid);
      const nestedCollectionRef = collection(parentDocRef, 'reminder');
      const querySnapshot = await getDocs(nestedCollectionRef);
      const notes = querySnapshot.docs.map((reminder) => {
        console.log(reminder.data());
      })
    };
    fetchData();
  }, [reminder]);
  useEffect(() => {
    const fetchData = async () => {
      const parentDocRef = doc(db, 'user', uid);
      const nestedCollectionRef = collection(parentDocRef, 'notes');
      const q = query(nestedCollectionRef, where('label', '==', label));
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((note) => {
        console.log(note.data());
      })
      console.log(notes);

    };
    fetchData();
  }, [label]);
  useEffect(() => {
    const fetchData = async () => {
      const parentDocRef = doc(db, 'user', uid);
      const nestedCollectionRef = collection(parentDocRef, 'labels');
      const querySnapshot = await getDocs(nestedCollectionRef);
      const labels = querySnapshot.docs.map(doc => ({ id: doc.id }));
      setData(labels)
    };
    fetchData();
  }, [uid]);

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
          <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100" id='Reminders'>
            <img
              src="src/assets/notifications.svg"
              alt="notifications"
              className="p-2"
            />
            <p className="pl-6 text-base">Reminders</p>
          </div>
          {data?.map((item) => (
            <div
              key={item.id}
              className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
              id={item.id}
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
