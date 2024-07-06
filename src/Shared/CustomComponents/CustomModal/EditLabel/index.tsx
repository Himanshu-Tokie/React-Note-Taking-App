import { serverTimestamp } from 'firebase/firestore';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { stateType } from '../../../../Views/Dashboard/types';
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  updateLabel,
} from '../../../Firebase Utils';
import { CustomModalProps } from './types';

function CustomModal({ setShowModal }: CustomModalProps) {
  const uid = useSelector((state: stateType) => state.common.uid);
  const [data, setData] = useState<{ id: string }[]>();
  useEffect(() => {
    fetchLabels(uid).then((label) => setData(label));
  }, [uid]);
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      setShowModal(false);
    }
  }
  const handleEditClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (inputElement) {
      const oldLabel = inputElement.name;
      const newLabel = inputElement.value;
      updateLabel(uid, oldLabel, newLabel);
    }
  };

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (inputElement) {
      const label = inputElement.name;
      deleteLabel(uid, label);
    }
  };

  const handleTickClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    const labelData = {
      count: 0,
      time_stamp: serverTimestamp(),
    };
    if (inputElement) {
      const label = inputElement.value;
      createLabel(uid, label, true, labelData);
    }
  };
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
            <div
              className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label="modal"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <img
                src="src/assets/close.svg"
                alt=""
                className="hover:bg-gray-200"
              />
            </div>
          </div>
          <div className="p-4 md:p-5 flex flex-col">
            <div className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <img src="src/assets/close.svg" alt="close" />
              <input
                name="label"
                placeholder="Create Label"
                className="bg-gray-50 hover:bg-gray-100 outline-none"
              />
              <button type="button" onClick={handleTickClick}>
                <img src="src/assets/tick.svg" alt="tick" />
              </button>
            </div>
            {data?.map((label) => (
              <div
                key={label.id}
                className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <img src="src/assets/label.svg" alt="" />
                <input
                  name={label.id}
                  defaultValue={label.id}
                  className="bg-gray-50 hover:bg-gray-100 outline-none"
                />
                <button type="button" onClick={handleDeleteClick}>
                  <img src="src/assets/delete.svg" alt="delete" />
                </button>
                <button type="button" onClick={handleEditClick}>
                  <img src="src/assets/edit.svg" alt="edit" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
