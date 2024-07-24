import { Auth } from "firebase/auth";

export interface cardsProps{
    name:string;
    user:string;
    signOut:()=>void;
}