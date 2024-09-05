export interface notesProps {
  noteTitle?: string;
  noteContent?: string;
  setShowNoteEditor?: (key: boolean) => void;
  noteId?: string;
  handleToggle?: (noteId: string) => void;
  imageList?: string[];
  setChanges?:(key:boolean)=>void;
}
