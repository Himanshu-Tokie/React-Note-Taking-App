import { useDispatch } from 'react-redux';
import { useLabelUpdate } from '../../Shared/CustomHooks';
import { STRINGS } from '../../Shared/Constants';

export default function Reminders() {
  const dispatch = useDispatch();
  useLabelUpdate(dispatch, '');
  return (
    <h1 className="text-center dark:text-gray-300">{STRINGS.NO_REMINDER}</h1>
  );
}
