import CustomButton from './Custom Component/Custom Button';
import CustomGoogleButton from './Custom Component/Custom Google Button';
import CustomInput from './Custom Component/Custom Input';

function Login(): JSX.Element {
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
          <CustomInput labelName="Email" placeholderName="Enter your email" />
          <CustomInput
            labelName="Password"
            placeholderName="Enter your password"
          />
          <p className="text-[#7F56D9] font-medium text-sm py-2">
            Forgot password
          </p>
          <CustomButton text="Sign in" />
          <CustomGoogleButton />
        </div>
        <div className="flex place-content-center">
          <p className="text-[#475467] text-sm py-2">
            Don&apos;t have an account?{'  '}
            <span className="text-[#7F56D9] font-medium">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
