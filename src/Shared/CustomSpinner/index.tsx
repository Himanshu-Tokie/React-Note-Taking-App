import { CSSProperties } from 'react';
import { SyncLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};
export default function Spinner() {
  const loading = true;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 z-[60] top-1/2 left-1/2">
        <SyncLoader
          color="#000000"
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
