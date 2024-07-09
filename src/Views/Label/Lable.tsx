import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchNotes } from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import { labelProps } from './types';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';
import { useUpdateNotes } from '../../Shared/CustomHooks';
import { setLabel } from '../../Store/Label';

export default function Lable() {
  const data = useLocation();
  const dispatch = useDispatch();
  const { label } = data.state;
  const uid = useSelector((state: stateType) => state.common.uid);
  const [notesData, setNotesData] = useState<labelProps[]>();
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const toggleNoteEditor = () => {
    setShowNoteEditor((val) => !val);
  };

  const handleToggle = (noteId: string) => {
    setActiveNoteId((prevNoteId) => (prevNoteId === noteId ? null : noteId));
  };

  useEffect(() => {
    fetchNotes(uid, label).then((fetchedNotesData) =>
      setNotesData(fetchedNotesData)
    );
  }, [label, uid]);

  useUpdateNotes(uid, setNotesData, label);
  const params = useParams();
  useEffect(() => {
    dispatch(setLabel(params.labelId));
  }, [params, dispatch]);
  return (
    <div className="flex flex-wrap place-content-center">
      {notesData?.length ? (
        notesData?.map((note) => (
          <div
            className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4"
            key={note.noteId}
            // onClick={toggleNoteEditor}
            // onKeyDown={toggleNoteEditor}
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
      {showNoteEditor && (
        <EditNotes
          setShowNoteEditor={setShowNoteEditor}
          activeNoteId={activeNoteId}
        />
      )}
    </div>
  );
}
