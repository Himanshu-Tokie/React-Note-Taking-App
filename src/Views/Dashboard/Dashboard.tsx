import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import { useLabelUpdate } from '../../Shared/CustomHooks';
import { fetchSearchNotes } from '../../Shared/Firebase Utils';
import { notesDataProps, stateType } from './types';
import { STRINGS } from '../../Shared/Constants';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';

export default function Dashboard() {
  const location = useLocation();
  const [notesData, setNotesData] = useState<notesDataProps[]>();
  const [changes, setChanges] = useState<boolean>(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const uid = useSelector((state: stateType) => state.common.uid);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get(STRINGS.SEARCH);
  useEffect(() => {
    if (searchQuery) {
      fetchSearchNotes(uid, searchQuery).then((data) => {
        setNotesData(data);
        setChanges(false);
      });
    } else {
      setNotesData([]);
      setChanges(false);
    }
  }, [searchQuery, uid, changes]);
  const dispatch = useDispatch();
  useLabelUpdate(dispatch, '');
  const toggleNoteEditor = () => {
    setShowNoteEditor((val) => !val);
  };
  const handleToggle = (noteId: string) => {
    setActiveNoteId((prevNoteId) => (prevNoteId === noteId ? null : noteId));
  };
  const noteIdSetter = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    setActiveNoteId(e.currentTarget?.id);
    setShowNoteEditor((val) => !val);
  };
  return (
    <div className="flex flex-wrap place-content-center">
      {notesData?.length
        ? notesData?.map((note) => (
            <div
              id={note.noteId}
              className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-[#333333] dark:border-gray-700 m-4"
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
                setChanges={setChanges}
              />
            </div>
          ))
        : null}
      {showNoteEditor && (
        <EditNotes
          setShowNoteEditor={setShowNoteEditor}
          activeNoteId={activeNoteId}
          handleToggle={handleToggle}
          setChanges={setChanges}
        />
      )}
    </div>
  );
}
