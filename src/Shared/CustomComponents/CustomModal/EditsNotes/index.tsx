import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setUpdatedLabel } from '../../../../Store/Label';
import { setLoading } from '../../../../Store/Loader';
import { stateType } from '../../../../Views/Dashboard/types';
import Notes from '../../../../Views/Notes';
import { useUpdateNote } from '../../../CustomHooks';
import { fetchNote } from '../../../Firebase Utils';
import { editNoteProps } from './type';
import { ROUTES } from '../../../Constants';

export default function EditNotes({
  setShowNoteEditor,
  activeNoteId,
  handleToggle,
  setChanges,
}: editNoteProps) {
  const [notesData, setNotesData] = useState<DocumentData>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setLoading(true));
    fetchNote(uid, activeNoteId).then((note) => {
      setNotesData(note?.data());
      dispatch(setUpdatedLabel(note?.data()?.label.id));
      dispatch(setLoading(false));
    });
  }, [uid, activeNoteId, dispatch]);
  useUpdateNote(uid, setNotesData, activeNoteId);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setShowNoteEditor(false);
    }
  };
  const closeEditor = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = document.getElementById('editNotes');
    if (e.target === element) {
      setShowNoteEditor(false);
      if (location.pathname === ROUTES.HOMEPAGE) dispatch(setUpdatedLabel(''));
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        aria-label="blur screen"
        tabIndex={-1}
      />
      <div
        tabIndex={-1}
        className="cursor-default fixed top-0 left-0 right-0 z-[900] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
        onClick={closeEditor}
        onKeyDown={handleKeyDown}
        id="editNotes"
        role="button"
      >
        <div className="relative w-full max-w-lg max-h-full bg-white rounded-lg shadow dark:bg-[#252526]">
          {notesData && (
            <div className="p-2 md:px-4 md:py-0 space-y-4">
              <Notes
                imageList={notesData?.url}
                noteContent={notesData?.content}
                noteTitle={notesData?.title}
                setShowNoteEditor={setShowNoteEditor}
                noteId={activeNoteId ?? ''}
                handleToggle={handleToggle}
                setChanges={setChanges}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
