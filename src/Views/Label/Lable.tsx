import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchNotes } from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import CustomBox from '../../Shared/CustomComponents/CustomBox';
import { labelProps } from './types';
import EditNotes from '../../Shared/CustomComponents/CustomModal/EditsNotes';

export default function Lable() {
  const data = useLocation();
  const { label } = data.state;
  const uid = useSelector((state: stateType) => state.common.uid);
  const [notesData, setNotesData] = useState<labelProps[]>();
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const toogleNoteEditor = () => {
    setShowNoteEditor((val) => !val);
  };
  useEffect(() => {
    fetchNotes(uid, label).then((fetchedNotesData) =>
      setNotesData(fetchedNotesData)
    );
  }, [label, uid]);

  return (
    <div className="flex flex-wrap">
      {notesData?.map((note) => (
        <div
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          key={note.time_stamp}
          onClick={toogleNoteEditor}
          onKeyDown={toogleNoteEditor}
        >
          <CustomBox title={note.title} content={note.content} />
        </div>
      ))}
      {showNoteEditor && <EditNotes setShowNoteEditor={setShowNoteEditor} />}
    </div>
  );
}
