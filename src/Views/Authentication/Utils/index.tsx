import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import * as Yup from 'yup';
import {
  auth,
  googleProvider,
} from '../../../Services/Config/Firebase/firebase';
import { AppDispatch } from '../../../Store';
import { setLoading } from '../../../Store/Loader';
import YUP_STRINGS from '../Constants';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(YUP_STRINGS.FIRST_NAME_WARNING)
    .matches(/^[A-Za-z]+$/, YUP_STRINGS.INVALID_FIRST_NAME),
  lastName: Yup.string()
    .required(YUP_STRINGS.LAST_NAME_WARNING)
    .matches(/^[A-Za-z]+$/, YUP_STRINGS.INVALID_LAST_NAME),
  email: Yup.string()
    .email(YUP_STRINGS.INVALID_EMAIL)
    .required(YUP_STRINGS.EMAIL_WARNING),
  password: Yup.string()
    .required(YUP_STRINGS.PASSWORD_WARNING)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      YUP_STRINGS.INVALID_PASSWORD
    ),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref(YUP_STRINGS.PASSWORD_SMALL)],
      YUP_STRINGS.PASSWORD_NOT_MATCH
    )
    .required(YUP_STRINGS.CONFIRM_PASSWORD),
});

export const LogInSchema = Yup.object({
  email: Yup.string()
    .email(YUP_STRINGS.INVALID_EMAIL)
    .required(YUP_STRINGS.ENTER_EMAIL),
  password: Yup.string().required(YUP_STRINGS.ENTER_PASSWORD),
});

export const logInUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // console.error(error);
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    // console.log(error);
  }
};
