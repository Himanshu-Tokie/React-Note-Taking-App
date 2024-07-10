import { useDispatch } from 'react-redux';
import { useLabelUpdate } from '../../Shared/CustomHooks';

export default function Reminders() {
  // useEffect(() => {
  //   const fetchReminder = async () => {
  //     const parentDocRef = doc(db, 'user', uid);
  //     const nestedCollectionRef = collection(parentDocRef, 'reminder');
  //     const querySnapshot = await getDocs(nestedCollectionRef);
  //     const notes = querySnapshot.docs.map((reminder) => {
  //       console.log(reminder.data());
  //     });
  //   };
  //   fetchReminder();
  // }, [reminder]);
  const dispatch = useDispatch();
  useLabelUpdate(dispatch, '');
  return <h1 className="text-center">Reminder</h1>;
}
