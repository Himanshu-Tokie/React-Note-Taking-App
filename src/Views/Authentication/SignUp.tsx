import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';
import PopUpMessage from '../../Shared/CustomComponents/CustomModal/PopUp';
import { createUser } from '../../Shared/Firebase Utils';
import { SignupSchema } from './Utils';

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const formValues = useRef<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();
  const signUpUser = () => {
    if (formValues.current) {
      createUser(
        formValues.current.email,
        formValues.current.password,
        `${formValues.current.firstName} ${formValues.current.lastName}`,
        dispatch
      ).then(() => navigate('/login'));
    }
  };
  return (
    <div>
      {confirmationModal && (
        <PopUpMessage
          setConfirmationModal={setConfirmationModal}
          description="Are you sure want to sign up"
          confirmationFunction={signUpUser}
        />
      )}
      <div className="flex flex-col flex-wrap place-content-center px-16 py-4">
        <h1 className="font-bold self-center text-3xl dark:text-white">
          Welcome!
        </h1>
        <p className="text-[#475467] py-2 self-center dark:text-white">
          Happy to connect with you
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
              setConfirmationModal(true);
            }}
          >
            <Form>
              <div className="my-2">
                <label
                  htmlFor="firstName"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  First Name
                </label>
                <br />
                <Field
                  className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
                  type="text"
                  placeholder="Enter your first name"
                  id="firstName"
                  name="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="lastName"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  Last Name
                </label>
                <br />
                <Field
                  className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
                  type="lastName"
                  placeholder="Enter your lastName"
                  id="lastName"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  Email
                </label>
                <br />
                <Field
                  className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
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
                <label
                  htmlFor="password"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  Password
                </label>
                <br />
                <Field
                  className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 max-w-72"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <br />
                <Field
                  className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
                  type="password"
                  placeholder="Enter confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm"
              >
                Create Account
              </button>
            </Form>
          </Formik>
        </div>
        <div className="self-center">
          <p className="dark:text-gray-300">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-[#7F56D9] font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
