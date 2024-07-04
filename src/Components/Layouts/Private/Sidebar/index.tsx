import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../../Shared/Constants';
import { db } from '../../../../Services/Config/Firebase/firebase';
import { stateType } from '../../../../Views/Dashboard/types';

export default function Sidebar() {
  const [data, setData] = useState<{ id: string }[]>();
  const navigate = useNavigate();
  const uid = useSelector((state: stateType) => state.common.uid);
  useEffect(() => {
    const fetchLabels = async () => {
      const parentDocRef = doc(db, 'user', uid);
      const nestedCollectionRef = collection(parentDocRef, 'labels');
      const querySnapshot = await getDocs(nestedCollectionRef);
      const labels = querySnapshot.docs.map((label) => ({ id: label.id }));
      setData(labels);
    };
    fetchLabels();
  }, [uid]);

  return (
    <div className="xl:w-2/12 mt-3 md:w-1/4 w-60" id="sidebar">
      <div className="rounded-r-full cursor-pointer hover:bg-gray-100">
        <Link to={ROUTES.HOMEPAGE} className="flex p-4 items-center py-3">
          <img src="src/assets/lightbulb.svg" alt="lightbulb" className="p-2" />
          <p className="pl-6 text-base">Notes</p>
        </Link>
      </div>
      <div
        className="rounded-r-full cursor-pointer hover:bg-gray-100"
        id="Reminders"
      >
        <Link to={ROUTES.Reminder} className="flex p-4 items-center py-3">
          <img
            src="src/assets/notifications.svg"
            alt="notifications"
            className="p-2"
          />
          <p className="pl-6 text-base">Reminders</p>
        </Link>
      </div>

      {data?.map((item) => (
        <div
          key={item.id}
          className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
          id={item.id}
          onClick={() => navigate(ROUTES.Label, { state: { label: item.id } })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(ROUTES.Label, { state: { label: item.id } });
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img src="src/assets/label.svg" alt="label" className="p-2" />
          <p className="pl-6 text-base">{item.id}</p>
        </div>
      ))}

      <div
        className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
        id="Edit Labels"
      >
        <img src="src/assets/edit.svg" alt="edit" className="p-2" />
        <p className="pl-6 text-base">Edit Labels</p>
      </div>
    </div>
  );
}
