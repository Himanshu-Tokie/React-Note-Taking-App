import { useState } from 'react';
import { auth } from '../../Services/Config/Firebase/firebase';
import ICONS from '../../assets';
import { STRINGS } from '../Constants';
// import ChangePhoto from '../CustomComponents/CustomModal/ChangePhoto';
import { cardsProps } from './types';

export default function Cards({ name, user, signOut }: cardsProps) {
  const userPhoto = auth.currentUser?.photoURL;
  const [isVisible, setIsVisible] = useState(false);
  // const [imageUpload, setImageUpload] = useState(null);
  return (
    <>
      {/* {isVisible && <ChangePhoto photoURL={userPhoto} />} */}
      <div className="fixed right-0 z-[100] w-full max-w-60 p-2 mr-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex relative items-baseline text-gray-900 dark:text-white justify-center">
          <img
            src={userPhoto ?? ICONS.DEFAULT_PROFILE}
            alt=""
            className="h-20 rounded-full"
          />
          <div className="absolute bottom-0 right-1/4 bg-gray-500 rounded-full hover:bg-black">
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
              <img src={ICONS.WHITE_EDIT} alt="ImageEditor" />
            </button>
          </div>
        </div>
        <ul className="space-y-2 my-2 ">
          <li className="flex decoration-gray-500 justify-center">
            <span className="text-base font-bold text-white ms-3">
              {`Hi, ${name.charAt(0).toUpperCase() + name.slice(1).split(' ')[0]}!`}
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
          className="text-white font-bold bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          {STRINGS.SIGN_OUT}
        </button>
      </div>
    </>
  );
}
