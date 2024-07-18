import ICONS from '../../assets';
import { STRINGS } from '../Constants';
import { cardsProps } from './types';

export default function Cards({ name, user, signOut }: cardsProps) {
  return (
    <div className="fixed right-0 z-[100] w-full max-w-60 p-2 mr-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-baseline text-gray-900 dark:text-white justify-center">
        <img src={ICONS.DEFAULT_PROFILE} alt="" className="h-20" />
      </div>
      <ul className="space-y-2 my-3 ">
        <li className="flex decoration-gray-500 justify-center">
          <span className="text-base font-normal text-gray-500 ms-3">
            {name}
          </span>
        </li>
        <li className="flex decoration-gray-500 justify-center">
          <span className="text-base font-normal text-gray-500 ms-3">
            {user}
          </span>
        </li>
      </ul>
      <button
        type="button"
        onClick={signOut}
        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        {STRINGS.SIGN_OUT}
      </button>
    </div>
  );
}
