import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../Services/Config/Firebase/firebase';

export async function fetchNotes(uid: string, label: string) {
  const parentDocRef = doc(db, 'user', uid);
  const nestedCollectionRef = collection(parentDocRef, 'notes');
  const q = query(nestedCollectionRef, where('label', '==', label));
  const querySnapshot = await getDocs(q);
  const notes = querySnapshot.docs.map((note) => {
    return {
      content: note.data().content,
      label: note.data().label,
      title: note.data().title,
      time_stamp: note.data().time_stamp,
    };
  });
  return notes;
}

export const createNote = async (
  uid: string,
  content: string,
  label: string,
  title: string
) => {
  const parentDocRef = doc(db, 'user', uid);
  const nestedCollectionRef = collection(parentDocRef, 'notes');
  await addDoc(nestedCollectionRef, {
    content,
    label,
    title,
    time_stamp: serverTimestamp(),
  });
};
