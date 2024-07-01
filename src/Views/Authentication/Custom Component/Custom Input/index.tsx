import { CustomInputProps } from './types';

function CustomInput({
  labelName,
  placeholderName,
  touched,
  error,
  logIn = true,
}: CustomInputProps): JSX.Element {
  return (
    <div className="my-2">
      <label htmlFor={labelName}>{labelName}</label>
      <br />
      <input
        className="my-1 py-1 px-2 rounded-md border-2 w-full"
        type="text"
        placeholder={placeholderName}
        id={labelName}
      />
      {touched && error && logIn && <p>*{error}</p>}
    </div>
  );
}

export default CustomInput;
