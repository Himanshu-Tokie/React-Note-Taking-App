import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STRINGS } from '../../Shared/Constants';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';
import {
  useBodyScrollToogler,
  useLabelUpdate,
  useUpdateNotes,
} from '../../Shared/CustomHooks';
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
    window.scrollTo(0, 0);
  }, [params.labelId, uid]);
  useBodyScrollToogler(showNoteEditor);
  useUpdateNotes(uid, setNotesData, params.labelId ?? '');
  useLabelUpdate(dispatch, params.labelId ?? '');
  return (
    <div className="flex flex-wrap sm:pl-8">
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
              activeNoteId={activeNoteId ?? ''}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-1 justify-center items-center h-screen sm:pb-28 pb-32">
          <p className="dark:text-gray-300 text-xl sm:text-2xl">
            {/* <div className="flex flex-1 justify-center h-screen pb-40 items-center">
          <p className="dark:text-gray-300 sm:text-2xl"> */}
            {STRINGS.CREATE_NOTES}
          </p>
        </div>
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
