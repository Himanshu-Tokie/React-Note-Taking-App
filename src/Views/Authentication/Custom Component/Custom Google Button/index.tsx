function CustomGoogleButton(): JSX.Element {
  return (
    <div className="my-2 px-12 py-1 text-center bg-[#ffffff] text-white rounded-md font-medium text-sm border-2">
      <button
        type="button"
        className="w-full flex items-center justify-center text-[#344054] py-1"
      >
        <img
          src="src/assets/google.svg"
          alt="Google Icon"
          className="h-4 mr-2"
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default CustomGoogleButton;
