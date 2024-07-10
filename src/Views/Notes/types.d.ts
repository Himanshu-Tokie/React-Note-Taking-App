export interface notesProps{
    noteTitle?:string;
    noteContent?:string;
    setShowNoteEditor?:(key:boolean)=>void;
    noteId?:string
}