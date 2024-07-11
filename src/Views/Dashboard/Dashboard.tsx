import { useDispatch } from 'react-redux';
import { useLabelUpdate } from '../../Shared/CustomHooks';
import CustomBox from '../../Shared/CustomComponents/CustomBox';

export default function Dashboard() {
  const notesData = [
    {
      noteId: '53MVc9ewj0nmwCEidpZD',
      content: '<p>afsdfadsfdsfdfasdf</p>',
      label: 'qwe',
      title: '111',
    },
    {
      noteId: 'iXGxFEtUoyljrXA8s9Zh',
      content: '<p>qweq</p>',
      label: 'test',
      title: 'qwe',
    },
  ];
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
