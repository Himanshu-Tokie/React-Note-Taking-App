import { ErrorMessage, Field, Formik,Form } from 'formik';
import CustomButton from './Custom Component/Custom Button';
import { SignupSchema } from './Utils';
import CustomGoogleButton from './Custom Component/Custom Google Button';

function SignUp(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col flex-wrap place-content-center">
        <h2 className="font-bold">Sign up</h2>
        <div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <div className="my-2">
                <label htmlFor='firstName'>First Name</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="firstName"
                  placeholder="Enter your firstName"
                  id="firstName"
                  name='firstName'
                />
                <ErrorMessage name='firstName' component="div" className="text-red-500" />
              </div>
              <div className="my-2">
                <label htmlFor="lastName">Last Name</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="lastName"
                  placeholder="Enter your lastName"
                  id="lastName"
                  name='lastName'
                />
                <ErrorMessage name='lastName' component="div" className="text-red-500" />
              </div>
              <div className="my-2">
                <label htmlFor="email">email</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name='email'
                />
                <ErrorMessage name='email' component="div" className="text-red-500" />
              </div>
              <div className="my-2">
                <label htmlFor="password">Password</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name='password'
                />
                <ErrorMessage name='password' component="div" className="text-red-500" />
              </div>
              <div className="my-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="confirmPassword"
                  placeholder="Enter confirmPassword"
                  id="confirmPassword"
                  name='confirmPassword'
                />
                <ErrorMessage name='confirmPassword' component="div" className="text-red-500" />
              </div>
              <div className="my-2">
                <label htmlFor="number">Phone Number</label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full"
                  type="text"
                  placeholder="Enter your number"
                  id="number"
                  name='number'
                />
                <ErrorMessage name='number' component="div" className="text-red-500" />
              </div>
              <button type="submit" className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm">
              Get started
              </button>
            </Form>
          </Formik>
        </div>
        <div>
          <p>Already have an account? <span>Log in</span></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
