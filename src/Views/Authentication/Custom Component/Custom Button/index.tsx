import { CustomButtonProps } from './types';

function CustomButton({ text }: CustomButtonProps): JSX.Element {
  return (
    <div className="my-2 px-10 py-1 text-center bg-[#7F56D9] text-white rounded-md font-medium text-sm">
      <button type="button" className="">
        {text}
      </button>
    </div>
  );
}

export default CustomButton;
