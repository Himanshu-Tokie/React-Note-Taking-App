import { onAuthStateChanged } from 'firebase/auth';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../Services/Config/Firebase/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';
import { setLoading } from '../../Store/Loader';
import CustomGoogleButton from './Custom Component/Custom Google Button';
import { LogInSchema, logInUser } from './Utils';

function Login(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser?.getIdToken().then((token) => {
        dispatch(updateAuthTokenRedux(token));
        dispatch(setLoading(false));
      });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <div className="py-28">
      <div className="flex flex-col flex-wrap place-content-center">
        <div className="pb-5">
          <h2 className="font-semibold text-center pb-2 text-2xl">
            Log in to your account
          </h2>
          <p className="text-[#475467]">
            Welcome back! Please enter your details.
          </p>
        </div>
        <div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LogInSchema}
            onSubmit={(values) => {
              logInUser(values.email, values.password, dispatch);
            }}
          >
            <Form>
              <div className="my-2">
                <label htmlFor="email">Email</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="my-2">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <p className="text-[#7F56D9] font-medium text-sm py-2">
                Forgot password
              </p>
              <button
                type="submit"
                className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm"
                id="Firebase"
              >
                Sign in
              </button>
              <CustomGoogleButton />
            </Form>
          </Formik>
        </div>
        <div className="flex place-content-center">
          <p className="text-[#475467] text-sm py-2">
            Don&apos;t have an account?{' '}
            <span className="text-[#7F56D9] font-medium">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
