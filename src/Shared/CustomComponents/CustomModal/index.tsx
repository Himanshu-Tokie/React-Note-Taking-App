import { collection, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../../Services/Config/Firebase/firebase';
import { stateType } from '../../../Views/Dashboard/types';
import { CustomModalProps } from './types';

function CustomModal({ setShowModal }: CustomModalProps) {
  const uid = useSelector((state: stateType) => state.common.uid);
  const [data, setData] = useState<{ id: string }[]>();
  useEffect(() => {
    const fetchData = async () => {
      const parentDocRef = doc(db, 'user', uid);
      const nestedCollectionRef = collection(parentDocRef, 'labels');
      const querySnapshot = await getDocs(nestedCollectionRef);
      const labels = querySnapshot.docs.map((doc) => ({ id: doc.id }));
      setData(labels);
    };
    fetchData();
  }, [uid]);
  //   const createLabel = async () => {
  //     const parentDocRef = doc(db, 'user', uid);
  //     const nestedCollectionRef = collection(parentDocRef, 'labels');
  //     const labelDataRef = doc(nestedCollectionRef, 'Test1');
  //     await setDoc(labelDataRef, {
  //       count: 0,
  //       time_stamp: serverTimestamp(),
  //     });
  //   };
  //   createLabel();
  // console.log(document.getElementById('input'));

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Labels
            </h3>
            <img
              src="src/assets/close.svg"
              alt=""
              onClick={() => {
                setShowModal(false);
              }}
              className="hover:bg-gray-200"
            />
          </div>
          <div className="p-4 md:p-5 flex flex-col">
            {data?.map((label) => (
              <div
                key={label.id}
                className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img src="src/assets/label.svg" alt="" />
                <p>{label.id}</p>
                <img src="src/assets/edit.svg" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
