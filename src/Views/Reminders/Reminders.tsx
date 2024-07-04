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
  return <h1>Reminder</h1>;
}
