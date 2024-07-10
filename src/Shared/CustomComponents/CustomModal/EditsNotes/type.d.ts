export interface editNoteProps{
    setShowNoteEditor:(key:boolean)=>void,
    activeNoteId:string|null
}
export interface stateTypeLoader{
    loader:{
        isLoading:string
    }
}