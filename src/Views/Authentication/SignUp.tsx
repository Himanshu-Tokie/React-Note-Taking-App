import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';
import { createUser } from '../../Shared/Firebase Utils';
import { SignupSchema } from './Utils';

function SignUp(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col flex-wrap place-content-center pt-16">
        <h1 className="font-bold self-center text-2xl">Sign up</h1>
        <p className="text-[#475467] py-2">
          Welcome! Happy to connect with you.
        </p>
        <div className="w-1/4">
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
              createUser(
                values.email,
                values.password,
                values.firstName + values.lastName,
                navigate
              );
            }}
          >
            <Form>
              <div className="my-2">
                <label htmlFor="firstName">First Name</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
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
                <label htmlFor="lastName">Last Name</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
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
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div className="my-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
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
        <div>
          <p>
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
