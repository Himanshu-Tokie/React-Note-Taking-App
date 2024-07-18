import { ErrorMessage, Field } from 'formik';
import { signUpInputProps } from './types';

function CustomInput({ labelName, id, placeholder, type }: signUpInputProps) {
  return (
    <div className="my-2">
      <label
        htmlFor={id}
        className="text-stone-900 font-medium dark:text-gray-300"
      >
        {labelName}
      </label>
      <br />
      <Field
        className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
        type={type ?? 'text'}
        placeholder={placeholder}
        id={id}
        name={id}
      />
      <ErrorMessage
        name={id}
        component="p"
        className="text-red-500 text-sm italic max-w-72"
      />
    </div>
  );
}

export default CustomInput;
