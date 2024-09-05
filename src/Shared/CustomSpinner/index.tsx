import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { RootState } from '../../Store';
import { THEME } from '../Constants';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
export default function Spinner() {
  const loading = true;
  const theme = useSelector((state: RootState) => state.common.theme);
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" />
      <div className="fixed inset-0 z-[1000] top-1/2 left-1/2 ">
        <SyncLoader
          color={theme === THEME.DARK ? '#f4f6ec' : '#000000'}
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
