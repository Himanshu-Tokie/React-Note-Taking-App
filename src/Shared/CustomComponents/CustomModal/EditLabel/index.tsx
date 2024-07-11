import { MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../../../Views/Dashboard/types';
import ICONS from '../../../../assets';
import { useUpdateLabel } from '../../../CustomHooks';
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  updateLabel,
} from '../../../Firebase Utils';
import { CustomModalProps } from './types';

function CustomModal({ setShowModal }: CustomModalProps) {
  const uid = useSelector((state: stateType) => state.common.uid);
  const [data, setData] = useState<
    {
      labelId: string | undefined;
      id: string;
    }[]
  >();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLabels(uid).then((label) => setData(label));
  }, [uid]);
  useUpdateLabel(uid, setData);
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      setShowModal(false);
    }
  }
  const handleEditClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (inputElement) {
      const labelId = inputElement.name;
      const labelName = inputElement.value;
      updateLabel(uid, labelName, labelId, dispatch);
    }
  };

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (inputElement) {
      const label = inputElement.name;
      deleteLabel(uid, label, dispatch);
    }
  };

  const handleTickClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (inputElement) {
      const label = inputElement.value;
      createLabel(uid, label);
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-4"
        // onClick={() => setShowNoteEditor(false)}
      />
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="z-[1000] flex overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                <img src={ICONS.CLOSE} alt="" className="hover:bg-gray-200" />
              </div>
            </div>
            <div className="p-4 md:p-5 flex flex-col">
              <div className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <img src={ICONS.CLOSE} alt="close" />
                <input
                  name="label"
                  placeholder="Create Label"
                  className="bg-gray-50 hover:bg-gray-100 outline-none"
                />
                <button type="button" onClick={handleTickClick}>
                  <img src={ICONS.TICK} alt="tick" />
                </button>
              </div>
              {data?.map((label) => (
                <div
                  key={label.id}
                  className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <img src={ICONS.LABEL} alt="" />
                  <input
                    name={label.labelId}
                    defaultValue={label.id}
                    className="bg-gray-50 hover:bg-gray-100 outline-none"
                  />
                  <button type="button" onClick={handleDeleteClick}>
                    <img src={ICONS.DELETE} alt="delete" />
                  </button>
                  <button type="button" onClick={handleEditClick}>
                    <img src={ICONS.EDIT} alt="edit" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomModal;