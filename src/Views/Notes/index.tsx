import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createNote, fetchLabels } from '../../Shared/Firebase Utils';
import { stateType } from '../Dashboard/types';
import { editorConfig } from './Utils';

function Notes() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [labelData, setLabelData] = useState<{ id: string }[]>();
  // const [showEditor, setShowEditor] = useState(true);
  const uid = useSelector((state: stateType) => state.common.uid);
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
  //   useEffect(()=>{
  // // createNotes
  //   },[])
  function onClickSave() {
    createNote(uid, content, label, title);
    console.log('success');
  }
  return (
    <div className="w-1/2 mt-4 self-center" id="editor">
      <div className="flex items-center border-2 mb-2">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="title"
            className="w-full py-2 outline-none"
            onBlur={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
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
        </div>
      </div>

      {true && (
        <div className="App">
          <JoditEditor
            value={content}
            config={editorConfig}
            onBlur={(text) => {
              setContent(text);
              // setShowEditor(false);
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
