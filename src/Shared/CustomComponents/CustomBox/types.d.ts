export interface customBoxProps {
    title: string;
    content: string;
    noteId: string;
    isActive: boolean;
    handleToggle: (noteId: string) => void;
    toggleNoteEditor:()=>void;
    activeNoteId?:string;
    setChanges?:(key:boolean)=>void;
  }
  