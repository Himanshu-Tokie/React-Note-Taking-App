import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { customBoxProps } from './types';
import { deleteNotes } from '../../Firebase Utils';
import { stateType } from '../../../Views/Dashboard/types';

function CustomBox({
  title,
  content,
  noteId,
  isActive,
  handleToggle,
  toggleNoteEditor,
}: customBoxProps) {
  function handleClick() {
    handleToggle(noteId);
  }
  const uid = useSelector((state: stateType) => state.common.uid);
  useEffect(() => {
    // document.addEventListener('click', handleClick);
    // return () => {
    //   document.removeEventListener('click', handleClick);
    // };
  }, []);
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
  return (
    <>
      <div className="flex justify-end px-4 pt-4 relative">
        <button
          id="dropdownButton"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          aria-label="box"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
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
        {isActive && (
          <div
            id={noteId}
            className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute block top-14 right-2"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotes(uid, noteId);
                  }}
                  onKeyDown={handleKeyDown}
                  type="button"
                >
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Edit Note
                  </p>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotes(uid, noteId);
                  }}
                  onKeyDown={handleKeyDownDelete}
                  type="button"
                >
                  <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Delete
                  </p>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {content}
        </span>
      </div>
    </>
  );
}

export default CustomBox;
