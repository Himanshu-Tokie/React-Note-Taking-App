import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import * as Yup from 'yup';
import { auth } from '../../../Services/Config/Firebase/firebase';
import { ERROR, FIREBASE_STRINGS } from '../../../Shared/Constants';
import { signUpUser } from '../../../Shared/Firebase Utils';
import { toastError } from '../../../Shared/Utils';
import { AppDispatch } from '../../../Store';
import { setUidRedux, updateAuthTokenRedux } from '../../../Store/Common';
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

export const PasswordResetSchema = Yup.object().shape({
  email: Yup.string()
    .email(YUP_STRINGS.INVALID_EMAIL)
    .required(YUP_STRINGS.ENTER_EMAIL),
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
    await signInWithEmailAndPassword(auth, email, password).then(
      async (userDetails) => {
        const token = await userDetails.user.getIdToken();
        const { uid } = userDetails.user;
        dispatch(updateAuthTokenRedux(token));
        dispatch(setLoading(false));
        dispatch(setUidRedux(uid));
      }
    );
  } catch (error: unknown) {
    console.log(error);
    
    dispatch(setLoading(false));
    switch ((error as FirebaseError).code) {
      case FIREBASE_STRINGS.ERROR.INVALID_CREDENTIALS:
        toastError(ERROR.INVALID_CREDENTIALS);
        break;
      default:
        toastError(FIREBASE_STRINGS.ERROR.DEFAULT);
    }
  }
};

export const signInWithGoogle = async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const userDetail = await signInWithPopup(auth, provider)
      .then(async (user) => {
        const isNewUser: boolean =
          getAdditionalUserInfo(user)?.isNewUser || false;
        if (isNewUser) await signUpUser(user.user.uid);
        return user;
      })
      .catch((error) => {
        dispatch(setLoading(false));
        switch (error.code) {
          case FIREBASE_STRINGS.ERROR.POPUP_CLOSED:
            toastError(ERROR.POPUP_CLOSED);
            break;
          default:
            toastError(FIREBASE_STRINGS.ERROR.DEFAULT);
        }
      });
    if (userDetail) {
      const token = await userDetail?.user.getIdToken();
      const { uid } = userDetail.user;
      dispatch(updateAuthTokenRedux(token));
      dispatch(setUidRedux(uid));
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    toastError(FIREBASE_STRINGS.ERROR.DEFAULT);
    // console.log(error.code);
  }
};
