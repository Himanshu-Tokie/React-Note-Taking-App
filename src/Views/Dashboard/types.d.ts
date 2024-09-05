import { Timestamp } from "firebase/firestore";

export interface stateType{
    common:{
        uid:string,
        theme:string
    }
}

export interface notesDataProps{
    noteId: string;
    content: string;
    label: string;
    title: string;
    time_stamp: Timestamp;
}