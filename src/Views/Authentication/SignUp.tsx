import CustomButton from './Custom Component/Custom Button';
import CustomInput from './Custom Component/Custom Input';

function SignUp(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col flex-wrap place-content-center">
        <h2 className="font-bold">Sign up</h2>
        <div>
          <CustomInput
            labelName="First Name"
            placeholderName="Enter your first name"
          />
          <CustomInput
            labelName="Last Name"
            placeholderName="Enter your last name"
          />
          <CustomInput
            labelName="Email"
            placeholderName="Enter your first name"
          />
          <CustomInput
            labelName="Password"
            placeholderName="Enter your password"
          />
          <CustomInput
            labelName="Confirm Password"
            placeholderName="Enter your confirm password"
          />
          <CustomInput
            labelName="Phone Number"
            placeholderName="Enter your phone number"
          />
        </div>
        <CustomButton text="Get started" />
        <div>
          <p>Already have an account? Log in</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
