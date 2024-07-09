import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createNote, fetchLabels } from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import { editorConfig } from './Utils';
import { useUpdateLabel } from '../../Shared/CustomHooks';

function Notes() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState<{ id: string }[]>();
  const [showEditor, setShowEditor] = useState(false);
  const uid = useSelector((state: stateType) => state.common.uid);
  const labelId = useSelector(
    (state: { label: { labelId: string } }) => state.label.labelId
  );
  useEffect(() => {
    setLabel(labelId);
  }, [labelId]);
  // function handleEditorClick(e: MouseEvent) {
  //   const editor = document.getElementById('editor');
  //   if (editor?.contains(e.target as Element)) {
  //     setShowEditor(true);
  //   } else {
  //     //   setShowEditor(false);
  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener('click', handleEditorClick);
  //   return () => {
  //     document?.removeEventListener('click', handleEditorClick);
  //   };
  // }, []);
  useEffect(() => {
    fetchLabels(uid).then((labels) => setLabelData(labels));
  }, [uid]);
  useUpdateLabel(uid, setLabelData);
  //   useEffect(()=>{
  // // createNotes
  //   },[])
  function onClickSave() {
    createNote(uid, content, label, title);
    // console.log('success');
  }
  return (
    <div className="w-full self-center mt-8 max-w-xl" id="editor">
      <div className="flex items-center border-2 mb-2 rounded-lg">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="title"
            className="w-full py-2 outline-none"
            onBlur={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          {labelId ? (
            <>
              {/* {setLabel(labelId)} */}
              <p>{labelId}</p>
            </>
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

      {showEditor && (
        <div className="App">
          <JoditEditor
            value={content}
            config={editorConfig}
            onBlur={(text) => {
              setContent(text);
              setShowEditor(false);
            }}
          />
        </div>
      )}
      <button type="button" onClick={onClickSave}>
        Save
      </button>
    </div>
  );
}

export default Notes;
