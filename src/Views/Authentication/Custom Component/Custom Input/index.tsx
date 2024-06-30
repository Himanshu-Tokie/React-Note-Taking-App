import { CustomInputProps } from './types';

function CustomInput({
  labelName,
  placeholderName,
}: CustomInputProps): JSX.Element {
  return (
    <div className="my-2">
      <label htmlFor="">{labelName}</label>
      <br />
      <input
        className="my-1 py-1 px-2 rounded-md border-2 w-full"
        type="text"
        placeholder={placeholderName}
      />
    </div>
  );
}

export default CustomInput;
