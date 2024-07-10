import { useDispatch } from 'react-redux';
import { useLabelUpdate } from '../../Shared/CustomHooks';

export default function Dashboard() {
  const dispatch = useDispatch();
  useLabelUpdate(dispatch, '');
  return (
    <div className="flex flex-wrap">
      <h1>Dash</h1>
    </div>
  );
}
