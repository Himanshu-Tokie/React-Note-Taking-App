import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';
import { useLabelUpdate, useUpdateNotes } from '../../Shared/CustomHooks';
import { fetchNotesWithLabel } from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import { labelProps } from './types';

export default function Lable() {
  const params = useParams();
  const dispatch = useDispatch();
  const uid = useSelector((state: stateType) => state.common.uid);
  const [notesData, setNotesData] = useState<labelProps[]>();
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  // const [deletePopup, setDeletePopup] = useState(false);
  const noteIdSetter = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    setActiveNoteId(e.currentTarget?.id);
    setShowNoteEditor((val) => !val);
  };
  const toggleNoteEditor = () => {
    setShowNoteEditor((val) => !val);
  };

  const handleToggle = (noteId: string) => {
    setActiveNoteId((prevNoteId) => (prevNoteId === noteId ? null : noteId));
  };
  useEffect(() => {
    if (params.labelId)
      fetchNotesWithLabel(params.labelId, uid).then((fetchedNotesData) =>
        setNotesData(fetchedNotesData)
      );
  }, [params.labelId, uid]);

  useUpdateNotes(uid, setNotesData, params.labelId ?? '');
  useLabelUpdate(dispatch, params.labelId ?? '');

  // useEffect(() => {
  //   document.addEventListener('click', () => {
  //     setDeletePopup((val) => !val);
  //   });
  // }, []);
  return (
    <div className="flex flex-wrap place-content-center">
      {notesData?.length ? (
        notesData?.map((note) => (
          <div
            id={note.noteId}
            className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-[#333333] dark:border-[#5F6368] m-4"
            key={note.noteId}
            onClick={noteIdSetter}
            onKeyDown={noteIdSetter}
            tabIndex={0}
            role="button"
            aria-label="label"
          >
            <CustomBox
              title={note.title}
              content={note.content}
              noteId={note.noteId}
              isActive={activeNoteId === note.noteId}
              handleToggle={handleToggle}
              toggleNoteEditor={toggleNoteEditor}
              // showNoteEditor={showNoteEditor}
            />
          </div>
        ))
      ) : (
        <p className="dark:text-gray-300">Create new notes.....</p>
      )}
      {showNoteEditor && (
        <EditNotes
          setShowNoteEditor={setShowNoteEditor}
          activeNoteId={activeNoteId}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
}
