import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AUTHENTICATION, ROUTES, STRINGS } from '../../Shared/Constants';
import { resetPassword } from '../../Shared/Firebase Utils';
import ICONS from '../../assets';
import CustomInput from './Custom Component/Custom Input';
import { PasswordResetSchema } from './Utils';
import { RootState } from '../../Store';

function ForgotPassword(): JSX.Element {
  const theme = useSelector((state: RootState) =>
    state.common.theme.toLowerCase()
  );
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
          <h2 className="font-bold text-center pb-1 text-2xl dark:text-white">
            {STRINGS.FORGOT_PASSWORD}
          </h2>
          {/* <p className="max-w-72 text-xs dark:text-white text-justify">
            {STRINGS.FORGOT_PASSWORD_INSTRUCTIONS}
          </p> */}
        </div>
        <div>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={PasswordResetSchema}
            onSubmit={(values) => {
              resetPassword(values.email, theme);
            }}
          >
            <Form>
              <CustomInput
                labelName={STRINGS.EMAIL}
                id={AUTHENTICATION.ID.EMAIL}
                placeholder={AUTHENTICATION.PLACEHOLDER.EMAIL}
              />
              <button
                type="submit"
                className="w-full my-2 px-10 py-2 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm"
                id="Firebase"
              >
                {STRINGS.RESET_PASSWORD}
              </button>
            </Form>
          </Formik>
        </div>
        <div className="flex place-content-center">
          <p className="text-[#475467] text-sm pt-2 dark:text-gray-300">
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

export default ForgotPassword;
