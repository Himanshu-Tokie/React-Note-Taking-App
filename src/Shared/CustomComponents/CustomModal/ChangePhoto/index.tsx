import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../../../Views/Dashboard/types';
import { STRINGS } from '../../../Constants';
import { uploadUserImage } from '../../../Firebase Utils';
import { toastError } from '../../../Utils';
import { changePhotoProps } from './types';
import { RootState } from '../../../../Store';
import ICONS from '../../../../assets';

function ChangePhoto({ photoURL, setIsVisible }: changePhotoProps) {
  const uid = useSelector((state: stateType) => state.common.uid);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) =>
    state.common.theme.toLowerCase()
  );
  function handleImageAsFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files)
      uploadUserImage(uid, e.target.files[0], dispatch, theme);
    else toastError(STRINGS.ERROR, theme);
  }
  return (
    <div className="z-50">
      <button
        type="button"
        className="fixed inset-0 bg-black bg-opacity-80 z-[200]"
        aria-label="blur screen"
        tabIndex={-1}
        onClick={() => setIsVisible(false)}
      />
      <div className="pt-6 fixed z-[500] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={photoURL ?? ICONS.DEFAULT_PROFILE}
            alt="user profile"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {STRINGS.PROFILE}
          </h5>
          <span className="text-gray-400 max-w-80 text-center text-sm">
            {STRINGS.PROFILE_INSTRUCTION}
          </span>
          <div className="flex mt-4 md:mt-3">
            <label className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <span>{STRINGS.SELECT_IMAGE}</span>
              <input
                type="file"
                className="hidden"
                accept=".jpeg,.png,.jpg"
                onChange={handleImageAsFile}
              />
            </label>
            <button onClick={() => setIsVisible(false)} type="button">
              <p className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {STRINGS.CANCEL}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePhoto;
