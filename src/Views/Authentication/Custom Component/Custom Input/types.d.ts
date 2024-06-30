import { FormikTouched } from "formik";

export interface CustomInputProps {
    labelName:string;
    placeholderName:string;
    error:string|undefined;
    logIn?:boolean;
    touched:FormikTouched
}