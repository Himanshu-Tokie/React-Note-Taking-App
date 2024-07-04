import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';

function Notes() {
  const [content, setContent] = useState('');
  // const [title, setTitle] = useState('');
  // const [label, setLabel] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  // const uid = useSelector((state: stateType) => state.common.uid);
  const buttons = [
    'bold',
    'strikethrough',
    'underline',
    'italic',
    '|',
    'align',
    '|',
    'ul',
    'ol',
    '|',
    'image',
    'link',
    '|',
    'fullsize',
    'selectall',
  ];
  const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: 'en',
    toolbarAdaptive: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons,
    uploader: {
      insertImageAsBase64URI: true,
    },
    height: 500,
    allowResizeY: false,
  };
  function handleEditorClick(e: MouseEvent) {
    const editor = document.getElementById('editor');
    if (editor?.contains(e.target as Element)) {
      setShowEditor(true);
    } else {
      //   setShowEditor(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleEditorClick);
    return () => {
      document?.removeEventListener('click', handleEditorClick);
    };
  }, []);
  //   useEffect(()=>{
  // // createNotes
  //   },[])
  return (
    <div className="w-1/2 mt-4 self-center" id="editor">
      <div className="flex items-center border-2 mb-2">
        <div className="flex-1 px-2">
          <input
            type="text"
            placeholder="title"
            className="w-full py-2 outline-none"
            // onBlur={(event) => setTitle(event.target.value)}
            // onChange={(text) => console.log(text)}
          />
        </div>
        <div>
          <select
            name="label"
            id="labelId"
            className="outline-none w-20"
            // onBlur={(event) => setLabel(event.target.value)}
          >
            <option value="label1">label1</option>
            <option value="label2">label2</option>
            <option value="label3">label3</option>
            <option value="label4">label4</option>
            <option value="label5">label5</option>
          </select>
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
    </div>
  );
}

export default Notes;
