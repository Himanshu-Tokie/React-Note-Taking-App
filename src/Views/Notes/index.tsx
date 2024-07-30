import { doc, getDoc } from 'firebase/firestore';
import JoditEditor from 'jodit-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../Services/Config/Firebase/firebase';
import { STRINGS, TOAST_STRINGS } from '../../Shared/Constants';
import { useLabelUpdate, useUpdateLabel } from '../../Shared/CustomHooks';
import {
  createNote,
  fetchLabels,
  updateNote,
  uploadImage,
} from '../../Shared/Firebase Utils';
import { setLoading } from '../../Store/Loader';
import { stateType } from '../Dashboard/types';
import { editorConfig } from './Utils';
import { notesProps } from './types';
import { toastError, toastSuccess } from '../../Shared/Utils';
import ICONS from '../../assets';
import Carousel from '../../Shared/CustomComponents/CustomCarousel';

function Notes({
  imageList,
  noteTitle,
  noteContent,
  setShowNoteEditor,
  noteId,
  handleToggle,
  setChanges,
}: notesProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const theme = useSelector(
    (state: stateType) => state.common.theme?.toLowerCase() ?? 'light'
  );
  const [cachedImage, setCachedImage] = useState<File[]>([]);
  const [cachedImageUrl, setCachedImageUrl] = useState<string[]>([]);

  useEffect(() => {
    const newFile = cachedImage.at(-1);
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      setCachedImageUrl((urls) => [...urls, url]);
    }
  }, [cachedImage]);
  // const [confirmationModal, setConfirmationModal] = useState(false);
  const [labelData, setLabelData] =
    useState<{ id: string; labelId: string }[]>();
  const dispatch = useDispatch();
  const [currentLabel, setCurrentLabel] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);
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
    const regexContent = /^[\s\u00A0\xA0]*$/;
    const regexTitle = /^\s*$/;
    const textContent = content.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    if (!regexTitle.test(title) || !regexContent.test(textContent)) {
      dispatch(setLoading(true));
      if (noteId && setShowNoteEditor) {
        updateNote(uid, noteId, content, title)
          .then(() => {
            setShowNoteEditor(false);
            setContent('');
            setTitle('');
            if (handleToggle) handleToggle(noteId);
            dispatch(setLoading(false));
            if (setChanges) setChanges(true);
            toastSuccess(TOAST_STRINGS.NOTES_UPDATED);
          })
          .catch(() => {
            dispatch(setLoading(false));
            toastError(STRINGS.ERROR);
          });
      } else {
        if (selectRef.current)
          if (selectRef.current.value === STRINGS.SELECT_LABEL) {
            toastError(TOAST_STRINGS.EMPTY_LABEL);
            dispatch(setLoading(false));
            return;
          }
        createNote(uid, content, label, title, cachedImage, dispatch)
          .then(() => {
            setContent('');
            setTitle('');
            cachedImageUrl.forEach((url) => URL.revokeObjectURL(url));
            setCachedImage([]);
            setCachedImageUrl([]);
            if (selectRef.current)
              selectRef.current.value = STRINGS.SELECT_LABEL;
            setShowEditor(false);
            dispatch(setLoading(false));
            toastSuccess(TOAST_STRINGS.NOTES_CREATED);
          })
          .catch(() => {
            dispatch(setLoading(false));
            toastError(STRINGS.ERROR);
          });
      }
    } else {
      setContent('');
      setTitle('');
      cachedImageUrl.forEach((url) => URL.revokeObjectURL(url));
      setCachedImage([]);
      setCachedImageUrl([]);
      if (selectRef.current) selectRef.current.value = STRINGS.SELECT_LABEL;
      setShowEditor(false);
      toastError(TOAST_STRINGS.EMPTY_NOTES);
    }
  }
  function onClickCancel() {
    setContent('');
    setTitle('');
    cachedImageUrl.forEach((url) => URL.revokeObjectURL(url));
    setCachedImage([]);
    setCachedImageUrl([]);
    if (selectRef.current) selectRef.current.value = STRINGS.SELECT_LABEL;
    if (setShowNoteEditor && noteId && handleToggle) {
      setShowNoteEditor(false);
      handleToggle(noteId);
    } else setShowEditor(false);
  }
  function handleImageAsFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ?? null;

    if (files && files.length > 0) {
      if (noteId) {
        uploadImage(uid, files[0], dispatch, noteId);
      } else {
        setCachedImage((val) => [...val, files[0]]);
      }
    } else {
      toastError(STRINGS.ERROR);
    }
  }
  return (
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
            placeholder={showEditor ? STRINGS.TITLE : STRINGS.TAKE_NOTE}
            className="w-full py-2 outline-none dark:bg-[#333333] dark:text-gray-300"
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
            maxLength={30}
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
              ref={selectRef}
            >
              <option value={STRINGS.SELECT_LABEL}>
                {STRINGS.SELECT_LABEL}
              </option>
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
        <div>
          {imageList && (
            <div>
              <Carousel imageList={imageList} noteId={noteId ?? ''} />
            </div>
          )}
          {cachedImage && (
            <div>
              <Carousel
                imageList={cachedImageUrl}
                noteId={noteId ?? ''}
                setCachedImage={setCachedImage}
                setCachedImageURL={setCachedImageUrl}
              />
            </div>
          )}
          <div className="relative">
            <div className="absolute left-1 top-1 z-50">
              <label className="inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white hover:bg-[#dcdcdc] dark:hover:bg-[#c0c0c0]">
                <img src={ICONS.IMAGE} alt="pic" className="" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageAsFile}
                />
              </label>
            </div>
            <div id="joditEditor">
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
        </div>
      )}
    </div>
  );
}

export default Notes;
