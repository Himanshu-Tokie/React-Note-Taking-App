import { signInWithGoogle } from "../../Utils";

function CustomGoogleButton(): JSX.Element {
  return (
      <button
        type="button"
        className="w-full flex items-center justify-center text-[#344054] py-2 my-1 px-12 text-center bg-[#ffffff] rounded-md font-medium text-sm border-2"
        id='Google'
        onClick={signInWithGoogle}
      >
        <img
          src="src/assets/google.svg"
          alt="Google Icon"
          className="h-4 mr-2"
        />
        Sign in with Google
      </button>
  );
}

export default CustomGoogleButton;
