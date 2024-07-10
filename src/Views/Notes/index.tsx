import JoditEditor from 'jodit-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLabelUpdate, useUpdateLabel } from '../../Shared/CustomHooks';
import {
  createNote,
  fetchLabels,
  updateNote,
} from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import { editorConfig } from './Utils';
import { notesProps } from './types';

function Notes({
  noteTitle,
  noteContent,
  setShowNoteEditor,
  noteId,
}: notesProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState<{ id: string }[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (noteTitle && noteContent) {
      setTitle(noteTitle);
      setContent(noteContent);
    }
  }, [noteContent, noteTitle]);
  const [showEditor, setShowEditor] = useState(false);
  const uid = useSelector((state: stateType) => state.common.uid);
  const labelId = useSelector(
    (state: { label: { labelId: string } }) => state.label.labelId
  );
  const editorRef = useRef(null);
  useLabelUpdate(dispatch, labelId ?? '');

  useEffect(() => {
    setLabel(labelId);
  }, [labelId]);
  const handleEditorClick = useCallback(
    (e: MouseEvent) => {
      const editor = document.getElementById('editor');
      if (editor?.contains(e.target as Element) && !showEditor) {
        setShowEditor(true);
      }
    },
    [showEditor]
  );
  useEffect(() => {
    document.addEventListener('click', handleEditorClick);
    return () => {
      document?.removeEventListener('click', handleEditorClick);
    };
  }, [handleEditorClick]);
  useEffect(() => {
    fetchLabels(uid).then((labels) => setLabelData(labels));
  }, [uid]);
  useUpdateLabel(uid, setLabelData);

  function onClickSave() {
    if ((title || content) && label) {
      if (noteId && setShowNoteEditor) {
        updateNote(uid, noteId, content, title, label);
        setShowNoteEditor(false);
        setContent('');
        setTitle('');
      } else
        createNote(uid, content, label, title).then(() => {
          setContent('');
          setTitle('');
          setShowEditor(false);
        });
    } else {
      alert('Empty Notes');
    }
  }
  function onClickCancel() {
    setContent('');
    setTitle('');
    if (setShowNoteEditor) setShowNoteEditor(false);
    else setShowEditor(false);
  }
  return (
    <div className="w-full self-center mt-8 max-w-xl" id="note">
      <div className="flex items-center border-2 mb-2 rounded-lg" id="editor">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="title"
            className="w-full py-2 outline-none"
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
          />
        </div>
        <div className="px-2">
          {labelId ? (
            <p>{labelId}</p>
          ) : (
            <select
              name="label"
              id="labelId"
              className="outline-none w-30"
              onBlur={(event) => setLabel(event.target.value)}
            >
              {labelData?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {(showEditor || noteTitle) && (
        <>
          <div className="App">
            <JoditEditor
              ref={editorRef}
              value={content}
              config={editorConfig}
              onBlur={(text) => {
                setContent(text);
              }}
            />
          </div>
          <div className="text-center p-4">
            <button
              type="button"
              onClick={onClickCancel}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onClickSave}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Notes;
