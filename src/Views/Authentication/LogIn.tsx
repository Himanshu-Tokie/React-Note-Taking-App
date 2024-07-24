import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTHENTICATION, ROUTES, STRINGS } from '../../Shared/Constants';
import ICONS from '../../assets';
import CustomGoogleButton from './Custom Component/Custom Google Button';
import CustomInput from './Custom Component/Custom Input';
import { LogInSchema, logInUser } from './Utils';

function Login(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className="px-10 bg-opacity-40 py-10">
      <div className="flex flex-col flex-wrap place-content-center">
        <div className="flex place-content-center">
          <img src={ICONS.DIARY} alt="" className="h-14" />
          <p className="font-bold text-center text-2xl sm:text-3xl content-center dark:text-white">
            <span className="text-[#7F56D9]">
              {STRINGS.NOTE_TAKING_APP.PART1}
            </span>
            {STRINGS.NOTE_TAKING_APP.PART2}
          </p>
        </div>
        <div className="py-4">
          <h2 className="font-bold text-center pb-3 text-2xl dark:text-white">
            {STRINGS.WELCOME1}
          </h2>
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
              <p className="text-[#7F56D9] font-medium text-sm py-2">
                <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>
              </p>
              <button
                type="submit"
                className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm"
                id="Firebase"
              >
                {STRINGS.SIGN_IN}
              </button>
              <CustomGoogleButton />
            </Form>
          </Formik>
        </div>
        <div className="flex place-content-center">
          <p className="text-[#475467] text-sm py-2 dark:text-gray-300">
            {STRINGS.DONT_HAVE_ACCOUNT}
            <Link to={ROUTES.SIGN_UP} className="text-[#7F56D9] font-medium">
              {STRINGS.SIGN_UP}
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
