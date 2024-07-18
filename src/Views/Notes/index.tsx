import { doc, getDoc } from 'firebase/firestore';
import JoditEditor from 'jodit-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../Services/Config/Firebase/firebase';
import { STRINGS } from '../../Shared/Constants';
import { useLabelUpdate, useUpdateLabel } from '../../Shared/CustomHooks';
import {
  createNote,
  fetchLabels,
  updateNote,
} from '../../Shared/Firebase Utils';
import { setLoading } from '../../Store/Loader';
import { stateType } from '../Dashboard/types';
import { editorConfig } from './Utils';
import { notesProps } from './types';

function Notes({
  noteTitle,
  noteContent,
  setShowNoteEditor,
  noteId,
  handleToggle,
}: notesProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const theme = useSelector(
    (state: stateType) => state.common.theme.toLowerCase() ?? 'light'
  );
  // const [confirmationModal, setConfirmationModal] = useState(false);
  const [labelData, setLabelData] =
    useState<{ id: string; labelId: string }[]>();
  const dispatch = useDispatch();
  const [currentLabel, setCurrentLabel] = useState('');
  useEffect(() => {
    if (noteTitle) {
      setTitle(noteTitle);
    }
    if (noteContent) setContent(noteContent);
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
    if (labelId) {
      const labelRef = doc(db, 'user', uid, 'labels', labelId);
      getDoc(labelRef).then((data) => setCurrentLabel(data.data()?.label));
    }
  }, [labelId, uid]);
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
      const regex = /^\s*$/;
      if (!regex.test(title) || !regex.test(title)) {
        dispatch(setLoading(true));
        if (noteId && setShowNoteEditor) {
          updateNote(uid, noteId, content, title).then(() => {
            setShowNoteEditor(false);
            setContent('');
            setTitle('');
            if (handleToggle) handleToggle(noteId);
            dispatch(setLoading(false));
          });
        } else {
          createNote(uid, content, label, title).then(() => {
            setContent('');
            setTitle('');
            setShowEditor(false);
            dispatch(setLoading(false));
          });
        }
      } else {
        setContent('');
        setTitle('');
        setShowEditor(false);
        console.log('test');
        // set empty notes can't be created
      }
    } else {
      // setConfirmationModal(true);
      alert('Empty Notes or Labels');
    }
  }
  function onClickCancel() {
    setContent('');
    setTitle('');
    if (setShowNoteEditor && noteId && handleToggle) {
      setShowNoteEditor(false);
      handleToggle(noteId);
    } else setShowEditor(false);
  }
  return (
    <>
      {/* {confirmationModal && (
        <PopUpMessage
          description="Empty Notes or Labels"
          setConfirmationModal={setConfirmationModal}
          confirmationFunction={}
        />
      )} */}
      <div
        className="w-full self-center mt-8 max-w-xl dark:bg-[#252526]"
        id="note"
      >
        <div
          className="flex items-center border-2 mb-2 rounded-lg dark:bg-[#333333] dark:border-[#5F6368]"
          id="editor"
        >
          <div className="flex-1 px-2">
            <input
              type="text"
              placeholder={STRINGS.TITLE}
              className="w-full py-2 outline-none dark:bg-[#333333] dark:text-gray-300"
              onChange={(e) => setTitle(e.currentTarget.value)}
              value={title}
            />
          </div>
          <div className="px-2">
            {labelId ? (
              <p className="dark:text-gray-300">{currentLabel}</p>
            ) : (
              <select
                name="label"
                id="labelId"
                className="outline-none w-30 dark:bg-[#333333] dark:text-gray-300"
                onBlur={(event) => setLabel(event.target.value)}
              >
                <option value="">{STRINGS.SELECT_LABEL}</option>
                {labelData?.map((item) => (
                  <option value={item.labelId} key={item.labelId}>
                    {item.id}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {(showEditor || noteTitle || noteContent) && (
          <>
            <div className="App">
              <JoditEditor
                ref={editorRef}
                value={content}
                config={{
                  ...editorConfig,
                  theme,
                }}
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
                {STRINGS.CANCEL}
              </button>
              <button
                type="button"
                onClick={onClickSave}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {STRINGS.SAVE}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
