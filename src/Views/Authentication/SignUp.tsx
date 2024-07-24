import { Form, Formik } from 'formik';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AUTHENTICATION, ROUTES, STRINGS } from '../../Shared/Constants';
import { createUser } from '../../Shared/Firebase Utils';
import { toastError, toastSuccess } from '../../Shared/Utils';
import CustomInput from './Custom Component/Custom Input';
import { SignupSchema } from './Utils';
import { setLoading } from '../../Store/Loader';

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formValues = useRef<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();
  const signUpUser = () => {
    try {
      if (formValues.current) {
        createUser(
          formValues.current.email,
          formValues.current.password,
          `${formValues.current.firstName} ${formValues.current.lastName}`,
          dispatch
        )
          .then(() => {
            toastSuccess(STRINGS.SIGNUP_MESSAGE);
            navigate('/login');
          })
          .catch(() => {
            toastError('Signup failed');
            dispatch(setLoading(false));
          });
      }
    } catch (e) {
      toastError('Some issues please try again');
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <div className="flex flex-col flex-wrap place-content-center px-8 md:px-16 py-4">
        <h1 className="font-bold self-center text-3xl dark:text-white">
          {STRINGS.WELCOME2}
        </h1>
        <p className="text-[#475467] py-2 self-center dark:text-white">
          {STRINGS.WELCOME_MESSAGE}
        </p>
        <div className="bg-opacity-50">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              formValues.current = values;
              signUpUser();
            }}
          >
            <Form>
              <CustomInput
                labelName={STRINGS.FIRST_NAME}
                id={AUTHENTICATION.ID.FIRST_NAME}
                placeholder={AUTHENTICATION.PLACEHOLDER.FIRST_NAME}
              />
              <CustomInput
                labelName={STRINGS.LAST_NAME}
                id={AUTHENTICATION.ID.LAST_NAME}
                placeholder={AUTHENTICATION.PLACEHOLDER.LAST_NAME}
              />
              <CustomInput
                labelName={STRINGS.EMAIL}
                id={AUTHENTICATION.ID.EMAIL}
                placeholder={AUTHENTICATION.PLACEHOLDER.EMAIL}
              />
              <CustomInput
                labelName={STRINGS.PASSWORD}
                id={AUTHENTICATION.ID.PASSWORD}
                placeholder={AUTHENTICATION.PLACEHOLDER.PASSWORD}
                type={AUTHENTICATION.TYPE.PASSWORD}
              />
              <CustomInput
                labelName={STRINGS.CONFIRM_PASSWORD}
                id={AUTHENTICATION.ID.CONFIRM_PASSWORD}
                placeholder={AUTHENTICATION.PLACEHOLDER.CONFIRM_PASSWORD}
                type={AUTHENTICATION.TYPE.PASSWORD}
              />
              <button
                type="submit"
                className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm"
              >
                {STRINGS.CREATE_ACCOUNT}
              </button>
            </Form>
          </Formik>
        </div>
        <div className="self-center">
          <p className="dark:text-gray-300">
            {STRINGS.HAVE_ACCOUNT}
            <Link to={ROUTES.LOGIN} className="text-[#7F56D9] font-medium">
              {STRINGS.LOG_IN}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
