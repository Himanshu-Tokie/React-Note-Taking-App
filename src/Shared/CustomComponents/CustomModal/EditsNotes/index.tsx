import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../Store/Loader';
import { stateType } from '../../../../Views/Dashboard/types';
import Notes from '../../../../Views/Notes';
import { fetchNote } from '../../../Firebase Utils';
import { editNoteProps } from './type';

export default function EditNotes({
  setShowNoteEditor,
  activeNoteId,
  handleToggle,
}: editNoteProps) {
  const [notesData, setNotesData] = useState<DocumentData>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    fetchNote(uid, activeNoteId).then((note) => {
      setNotesData(note?.data());
      dispatch(setLoading(false));
    });
  }, [uid, activeNoteId, dispatch]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setShowNoteEditor(false);
    }
  };
  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setShowNoteEditor(false)}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="blur screen"
      />
      <div
        id="medium-modal"
        tabIndex={-1}
        className="fixed top-0 left-0 right-0 z-[1000] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-lg max-h-full bg-white rounded-lg shadow dark:bg-[#252526]">
          {notesData ? (
            <div className="p-2 md:px-4 md:py-0 space-y-4">
              <Notes
                noteContent={notesData?.content}
                noteTitle={notesData?.title}
                setShowNoteEditor={setShowNoteEditor}
                noteId={activeNoteId ?? ''}
                handleToggle={handleToggle}
              />
            </div>
          ) : (
            <p>hello</p>
          )}
        </div>
      </div>
    </div>
  );
}
