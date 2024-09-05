import { useDispatch, useSelector } from 'react-redux';
import { STRINGS } from '../../../../Shared/Constants';
import ICONS from '../../../../assets';
import { signInWithGoogle } from '../../Utils';
import { RootState } from '../../../../Store';

function CustomGoogleButton(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) =>
    state.common.theme.toLowerCase()
  );
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center text-[#344054] py-2 my-1 px-12 text-center bg-[#ffffff] rounded-md font-medium text-sm border-2"
      id="Google"
      onClick={() => {
        signInWithGoogle(dispatch, theme);
      }}
    >
      <img src={ICONS.GOOGLE} alt="Google Icon" className="h-4 mr-2" />
      {STRINGS.GOOGLE_SIGNIN}
    </button>
  );
}

export default CustomGoogleButton;
