import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';
import { useLabelUpdate, useUpdateNotes } from '../../Shared/CustomHooks';
import { fetchNotesWithLabel } from '../../Shared/Firebase Utils';
import { RootState } from '../../Store';
import { setLoading } from '../../Store/Loader';
import { stateType } from '../Dashboard/types';
import { labelProps } from './types';

export default function Lable() {
  const params = useParams();
  const dispatch = useDispatch();
  const uid = useSelector((state: stateType) => state.common.uid);
  const [notesData, setNotesData] = useState<labelProps[]>();
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const currentDivRef = useRef<HTMLDivElement | null>(null);
  const loading = useSelector((state: RootState) => state.loader.isLoading);
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

  if (showNoteEditor) {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }
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
            ref={activeNoteId === note.noteId ? currentDivRef : null}
          >
            <CustomBox
              title={note.title}
              content={note.content}
              noteId={note.noteId}
              isActive={activeNoteId === note.noteId}
              handleToggle={handleToggle}
              toggleNoteEditor={toggleNoteEditor}
            />
          </div>
        ))
      ) : (
        <p>Create new notes.....</p>
      )}
      {loading && showNoteEditor && (
        <EditNotes
          setShowNoteEditor={setShowNoteEditor}
          activeNoteId={activeNoteId}
        />
      )}
    </div>
  );
}
