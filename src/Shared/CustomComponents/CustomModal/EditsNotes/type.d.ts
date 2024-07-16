export interface editNoteProps{
    setShowNoteEditor:(key:boolean)=>void,
    activeNoteId:string|null,
    handleToggle: (noteId: string) => void;
}
export interface stateTypeLoader{
    loader:{
        isLoading:string
    }
}