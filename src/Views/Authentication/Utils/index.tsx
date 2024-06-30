import { YUP_STRINGS } from "../Constants";
import * as Yup from 'yup';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth,googleProvider } from "../../../Services/Config/Firebase/firebase";
// import { useNavigate } from "react-router-dom";

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(YUP_STRINGS.FIRST_NAME_WARNING).matches(/^[A-Za-z]+$/, YUP_STRINGS.INVALID_FIRST_NAME),
    lastName: Yup.string().required(YUP_STRINGS.LAST_NAME_WARNING).matches(/^[A-Za-z]+$/, YUP_STRINGS.INVALID_LAST_NAME),
    email: Yup.string().email(YUP_STRINGS.INVALID_EMAIL).required(YUP_STRINGS.EMAIL_WARNING),
    password: Yup.string()
        .min(8)
        .required(YUP_STRINGS.PASSWORD_WARNING)
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            YUP_STRINGS.INVALID_PASSWORD,
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref(YUP_STRINGS.PASSWORD_SMALL)],
        YUP_STRINGS.PASSWORD_NOT_MATCH,
    ),
    number: Yup.string()
        .matches(/^\d{10}$/, YUP_STRINGS.PHONE_NUMBER_WARNING1)
        .required(YUP_STRINGS.PHONE_NUMBER_WARNING2)
});

export const LogInSchema = Yup.object({
    email: Yup.string().email(YUP_STRINGS.INVALID_EMAIL).required(YUP_STRINGS.ENTER_EMAIL),
    password: Yup.string()
      .min(8)
      .required(YUP_STRINGS.ENTER_PASSWORD)
  });

export const logInUser = async (email: string, password: string) => {
    // const navigate = useNavigate();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(()=>{})
    } catch (error) {
      console.error(error);
    }
  };

export const signInWithGoogle = async()=>{
try{
    await signInWithPopup(auth, googleProvider)
}
catch(error){
console.log(error);
}
}