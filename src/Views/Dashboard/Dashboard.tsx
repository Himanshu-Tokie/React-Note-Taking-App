/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { STRINGS } from '../../Shared/Constants';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';
import { useLabelUpdate, useUpdateNotes } from '../../Shared/CustomHooks';
import { fetchSearchNotes } from '../../Shared/Firebase Utils';
import { RootState } from '../../Store';
import { notesDataProps, stateType } from './types';

export default function Dashboard() {
  const location = useLocation();
  const [notesSearchData, setNotesSearchData] = useState<notesDataProps[]>();
  const [notesData, setNotesData] = useState<notesDataProps[]>();
  const [changes, setChanges] = useState<boolean>(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const uid = useSelector((state: stateType) => state.common.uid);
  const defaultLabelId = useSelector(
    (state: RootState) => state.label.defaultLabelId
  );
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get(STRINGS.SEARCH);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery) {
      fetchSearchNotes(uid, searchQuery).then((data) => {
        setNotesSearchData(data);
        setChanges(false);
      });
    } else {
      setNotesSearchData([]);
      setChanges(false);
    }
  }, [searchQuery, uid, changes]);

  useLabelUpdate(dispatch, '');
  useUpdateNotes(uid, setNotesData, defaultLabelId);

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
    <div className="flex flex-wrap">
      {searchQuery ? (
        notesSearchData?.length ? (
          notesSearchData.map((note) => (
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
        ) : (
          <div className="flex-1 text-center content-center h-screen pb-40">
            <p className="dark:text-gray-300">No data found</p>
          </div>
        )
      ) : (
        notesData?.map((note) => (
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
      )}
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
