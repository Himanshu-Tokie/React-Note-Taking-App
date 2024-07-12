import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import { useLabelUpdate } from '../../Shared/CustomHooks';
import { fetchSearchNotes } from '../../Shared/Firebase Utils';
import { notesDataProps, stateType } from './types';

export default function Dashboard() {
  const location = useLocation();
  const [notesData, setNotesData] = useState<notesDataProps[]>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');
  useEffect(() => {
    if (searchQuery) {
      fetchSearchNotes(uid, searchQuery).then((data) => {
        setNotesData(data);
      });
    } else {
      setNotesData([]);
    }
  }, [searchQuery, uid]);
  const dispatch = useDispatch();
  useLabelUpdate(dispatch, '');
  const toggleNoteEditor = () => {};
  const handleToggle = () => {};
  return (
    <div className="flex flex-wrap place-content-center">
      {notesData?.length &&
        notesData?.map((note) => (
          <div
            id={note.noteId}
            className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4"
            key={note.noteId}
          >
            <CustomBox
              title={note.title}
              content={note.content}
              noteId={note.noteId}
              isActive={false}
              handleToggle={handleToggle}
              toggleNoteEditor={toggleNoteEditor}
            />
          </div>
        ))}
    </div>
  );
}
