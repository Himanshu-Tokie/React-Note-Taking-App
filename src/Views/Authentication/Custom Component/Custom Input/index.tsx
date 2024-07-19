import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';
import ICONS from '../../../../assets';
import { signUpInputProps } from './types';

function CustomInput({ labelName, id, placeholder, type }: signUpInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(type ?? 'text');
  return (
    <div className="my-2">
      <label
        htmlFor={id}
        className="text-stone-900 font-medium dark:text-gray-300"
      >
        {labelName}
      </label>
      <br />
      <div className="flex relative">
        <Field
          className="outline-none py-1 px-2 rounded-md border-2 w-full bg-neutral-100 min-w-72"
          type={isPassword !== 'text' && type ? 'password' : 'text'}
          placeholder={placeholder}
          id={id}
          name={id}
        />
        {type && (
          <button
            onClick={() => {
              setIsVisible((val) => !val);
              setIsPassword((val) => (val === 'text' ? 'password' : 'text'));
            }}
            aria-label="eye"
            type="button"
          >
            <img
              src={isVisible ? ICONS.VISIBLITY : ICONS.VISIBLITY_OFF}
              alt="visiblity"
              className="absolute right-1.5 top-1.5"
            />
          </button>
        )}
      </div>
      <ErrorMessage
        name={id}
        component="p"
        className="text-red-500 text-sm italic max-w-72"
      />
    </div>
  );
}

export default CustomInput;
