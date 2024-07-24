/* eslint-disable react/no-danger */
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { stateType } from '../../../Views/Dashboard/types';
import { STRINGS } from '../../Constants';
import { deleteNotes } from '../../Firebase Utils';
import { customBoxProps } from './types';

function CustomBox({
  title,
  content,
  noteId,
  isActive,
  handleToggle,
  toggleNoteEditor,
  activeNoteId,
}: customBoxProps) {
  const [show, setShow] = useState(isActive);
  const menuRef = useRef<HTMLDivElement>(null);
  const theObj = { __html: content };
  function handleClick() {
    handleToggle(noteId);
    setShow((val) => !val);
  }
  const uid = useSelector((state: stateType) => state.common.uid);
  // const theme = useSelector((state: stateType) => state.common.theme);
  function handleKeyDownDelete(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      deleteNotes(uid, noteId);
    }
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleNoteEditor();
    }
  }
  useEffect(() => {
    const box = document.getElementById(activeNoteId ?? '');
    document.addEventListener('click', (e) => {
      if (e.target instanceof Node && !box?.contains(e.target)) {
        setShow(false);
      }
    });
    return () =>
      document.removeEventListener('click', (e) => {
        if (e.target instanceof Node && !box?.contains(e.target)) {
          setShow(false);
        } else setShow(true);
      });
  }, [activeNoteId]);
  return (
    <div id="noteBox">
      <div className="flex justify-end px-4 pt-4 relative">
        <button
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm py-1.5"
          type="button"
          aria-label="box"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          onKeyDown={handleKeyDown}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {show && (
          <div
            id={noteId}
            ref={menuRef}
            className="text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute block top-14 right-2 customBox"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <button
                  className="flex flex-1 justify-center "
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNoteEditor();
                  }}
                  onKeyDown={handleKeyDown}
                  type="button"
                >
                  <p>{STRINGS.EDIT_NOTES}</p>
                </button>
              </li>
              <li className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <button
                  className="flex flex-1 justify-center "
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotes(uid, noteId);
                  }}
                  onKeyDown={handleKeyDownDelete}
                  type="button"
                >
                  <p>{STRINGS.DELETE}</p>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-left pb-8 px-4 max-h-52 overflow-hidden">
        <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 text-justify">
          <div dangerouslySetInnerHTML={theObj} />
        </span>
      </div>
    </div>
  );
}

export default CustomBox;
