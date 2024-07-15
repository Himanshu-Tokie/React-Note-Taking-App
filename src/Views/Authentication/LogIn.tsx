import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';
import ICONS from '../../assets';
import CustomGoogleButton from './Custom Component/Custom Google Button';
import { LogInSchema, logInUser } from './Utils';

function Login(): JSX.Element {
  const dispatch = useDispatch();
  // const [data, setData] = useState({});
  // const [count, setcount] = useState(1);
  // useEffect(() => {
  //   console.log('data');
  // }, [data]);
  // console.log(count);
  return (
    <div className="px-16 bg-opacity-40 py-10">
      <div className="flex flex-col flex-wrap place-content-center">
        <div className="flex place-content-center">
          <img src={ICONS.DIARY} alt="" className="h-14" />
          <p className="font-bold text-center text-2xl sm:text-3xl content-center dark:text-white">
            <span className="text-[#7F56D9]">Note-Ta</span>king App
          </p>
        </div>
        <div className="py-4">
          <h2 className="font-bold text-center pb-3 text-2xl dark:text-white">
            Welcome Back!
          </h2>
          {/* <p className="text-[#475467] sm:text-base text-xs text-center">
            Please enter your details.
          </p> */}
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
                <label
                  htmlFor="email"
                  className="text-stone-900 font-medium dark:text-gray-300"
                >
                  Email
                </label>
                <br />
                <Field
                  className="my-1 py-1 px-2 rounded-md border-2 w-full bg-neutral-100 outline-none"
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
                  className="my-1 py-1 px-2 rounded-md border-2 w-full bg-neutral-100 outline-none"
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
          <p className="text-[#475467] text-sm py-2 dark:text-gray-300">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="text-[#7F56D9] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
        {/* <button
          onClick={() => {
            setcount(val=>val+1);
          }}
        >
          test
        </button> */}
      </div>
    </div>
  );
}

export default Login;
