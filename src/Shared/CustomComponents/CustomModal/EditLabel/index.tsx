import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../../../Views/Dashboard/types';
import ICONS from '../../../../assets';
import { STRINGS, THEME, TOAST_STRINGS } from '../../../Constants';
import { useUpdateLabel } from '../../../CustomHooks';
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  updateLabel,
} from '../../../Firebase Utils';
import PopUpMessage from '../PopUp';
import { CustomModalProps } from './types';
import { toastError, toastSuccess } from '../../../Utils';
import { RootState } from '../../../../Store';

function CustomModal({ setShowModal }: CustomModalProps) {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isInputLabelEmpty, setIsInputLabelEmpty] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [isActive, setIsActive] = useState('');
  const [isLabelExist, setIsLabelExist] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const defalutLabel = useSelector(
    (state: RootState) => state.label.defaultLabelId
  );

  // const tickRef = useRef<HTMLImageElement>(null);
  const [data, setData] = useState<
    {
      labelId: string | undefined;
      id: string;
    }[]
  >();
  const [filteredData, setFilteredData] = useState<
    {
      labelId: string | undefined;
      id: string;
    }[]
  >();
  const dispatch = useDispatch();
  const theme = useSelector((state: stateType) =>
    state.common.theme.toLowerCase()
  );

  const isActiveRef = useRef('');

  // useEffect(() => {
  //     isActiveRef.current = isActive;
  // }, [isActive]);

  useEffect(() => {
    fetchLabels(uid).then((label) => setData(label));
  }, [uid]);
  useUpdateLabel(uid, setData);
  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => defalutLabel !== item.labelId);
      setFilteredData(filtered);
    }
  }, [data, defalutLabel]);
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      setShowModal(false);
    }
  }
  const handleEditClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    if (!isActive) inputElement?.focus();
    else {
      inputElement?.blur();
      setIsActive('');
    }
  };
  const saveLabel = (e: React.FocusEvent<HTMLInputElement>) => {
    const labelName = e.currentTarget.value;
    const labelId = e.currentTarget.name;
    const regex = /^[\s\u00A0\xA0]*$/;
    if (!regex.test(labelName))
      updateLabel(uid, labelName, labelId, dispatch)
        .then(() => {
          toastSuccess(TOAST_STRINGS.LABEL_EDIT, theme);
        })
        .catch(() => {
          toastError(STRINGS.ERROR, theme);
        });
    else setIsInputLabelEmpty(true);
  };
  const handleDeleteClick = () => {
    if (selectedLabel) {
      deleteLabel(uid, selectedLabel, dispatch)
        .then(() => {
          toastSuccess(TOAST_STRINGS.LABEL_DELETED, theme);
        })
        .catch(() => {
          toastError(STRINGS.ERROR, theme);
        });
      setConfirmationModal(false);
      setSelectedLabel(undefined);
    }
  };
  const handleTickClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const targetElement = event.target as Element;
    const inputElement = targetElement.closest('div')?.querySelector('input');
    const regex = /^[\s\u00A0\xA0]*$/;
    if (inputElement?.value)
      if (!regex.test(inputElement?.value)) {
        const label = inputElement.value;
        const isExists = data?.filter((item) => item.id === label);
        if (!isExists?.length) {
          createLabel(uid, label)
            .then(() => {
              toastSuccess(TOAST_STRINGS.LABEL_CREATED, theme);
            })
            .catch(() => {
              toastError(STRINGS.ERROR, theme);
            });
          setToggler(false);
          setIsEmpty(false);
          setIsLabelExist(false);
          inputElement.value = '';
        } else setIsLabelExist(true);
      } else {
        setIsEmpty(true);
        setIsLabelExist(false);
      }
  };
  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = () => {
    const target = document.getElementById('labelInput') as HTMLInputElement;
    if (target) target.value = '';
    setToggler((val) => !val);
    setIsEmpty(false);
    setIsLabelExist(false);
  };
  const closeEditor = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = document.getElementById('editLabel');
    if (e.target === element) setShowModal(false);
  };
  return (
    <>
      {confirmationModal && (
        <PopUpMessage
          setConfirmationModal={setConfirmationModal}
          description={STRINGS.DELETE_LABEL_DESCRIPTION}
          confirmationFunction={handleDeleteClick}
        />
      )}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-hidden" />
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="z-[1000] flex overflow-y-auto overflow-x-hidden fixed justify-center items-center w-full inset-0 max-h-full "
        id="editLabel"
        onClick={closeEditor}
      >
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div className="relative bg-white rounded-lg shadow dark:bg-[#1E1E1E] w-11/12 sm:w-full">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {STRINGS.EDIT_LABELS}
              </h3>
              <div
                className="px-2 py-2 hover:bg-gray-100 cursor-pointer rounded-full"
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="modal"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <img src={ICONS.CLOSE} alt="close" />
              </div>
            </div>
            <div className="p-4 md:p-5 flex flex-col">
              {isInputLabelEmpty && (
                <p className="text-xs text-red-600 text-center italic">
                  {STRINGS.LABLE_NOT_EMPTY}
                </p>
              )}
              <div className="justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow dark:bg-[#333333] dark:text-white mb-0.5">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleCloseClick}
                    className=" hover:bg-gray-200 cursor-pointer rounded-full p-1"
                  >
                    {toggler ? (
                      <img src={ICONS.CLOSE} alt="close" />
                    ) : (
                      <img src={ICONS.ADD} alt="add" />
                    )}
                  </button>
                  <input
                    id="labelInput"
                    name="label"
                    placeholder="Create Label"
                    className="bg-gray-50 hover:bg-gray-100 outline-none dark:bg-[#333333] flex-1 pl-5"
                    maxLength={30}
                    onFocus={() => {
                      setToggler(true);
                      setIsEmpty(false);
                    }}
                  />
                  {toggler && (
                    <button
                      type="button"
                      onClick={handleTickClick}
                      className='hover:bg-gray-200 cursor-pointer rounded-full p-4"'
                    >
                      <img src={ICONS.TICK} alt="tick" />
                    </button>
                  )}
                </div>
                {isEmpty && (
                  <p className="text-xs text-red-600 italic">
                    {STRINGS.EMPTY_LABEL}
                  </p>
                )}
                {isLabelExist && (
                  <p className="text-xs text-red-600 italic text-center">
                    {STRINGS.LABEL_EXISTS}
                  </p>
                )}
              </div>
              {filteredData?.map((label) => (
                // <EditLabelRow name={label.labelId} value={label.id} />
                <div
                  key={label.id}
                  className="my-0.5 flex justify-between items-center  p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow-lg dark:bg-[#333333] dark:text-white"
                >
                  <img
                    src={theme === THEME.DARK ? ICONS.LABEL : ICONS.LABEL_DARK}
                    alt="label"
                  />
                  <input
                    name={label.labelId}
                    defaultValue={label.id}
                    className="bg-gray-50 hover:bg-gray-100 outline-none dark:text-gray-50 dark:bg-[#333333] w-20 sm:w-full sm:pl-2"
                    onFocus={() => {
                      setIsActive(label.id);
                      setIsInputLabelEmpty(false);
                    }}
                    onBlur={(e) => {
                      setIsActive(STRINGS.EMPTY);
                      isActiveRef.current = '';
                      saveLabel(e);
                    }}
                    maxLength={30}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLabel(label.labelId);
                      setConfirmationModal(true);
                    }}
                    className="hover:bg-red-600 cursor-pointer rounded-full sm:p-1"
                  >
                    <img src={ICONS.DELETE} alt="delete" />
                  </button>

                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="hover:bg-gray-200 cursor-pointer rounded-full sm:p-1"
                  >
                    {isActive === label.id ? (
                      <img src={ICONS.TICK} alt="tick" />
                    ) : (
                      <img src={ICONS.EDIT_DARK} alt="edit" />
                    )}
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
