import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';
import { auth, db } from '../../Services/Config/Firebase/firebase';
import { NOTES, ROUTES } from '../Constants';

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

export const signUpUser = async (
  uid: string,
  navigate: (path: string) => void
) => {
  try {
    const notes = [
      {
        label: NOTES.ACADEMICS.NAME,
        title: NOTES.ACADEMICS.TITLE,
        content: NOTES.ACADEMICS.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
        label: NOTES.OTHERS.NAME,
        title: NOTES.OTHERS.TITLE,
        content: NOTES.OTHERS.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
        label: NOTES.PERSONAL.NAME,
        title: NOTES.PERSONAL.TITLE,
        content: NOTES.PERSONAL.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
        label: NOTES.WORK.NAME,
        title: NOTES.WORK.TITLE,
        content: NOTES.WORK.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
    ];
    const labels = [
      NOTES.WORK.NAME,
      NOTES.ACADEMICS.NAME,
      NOTES.OTHERS.NAME,
      NOTES.PERSONAL.NAME,
    ];
    const batch = writeBatch(db);
    const newNoteRef = doc(db, 'user', uid);
    const notesRef = collection(newNoteRef, 'notes');
    const labelRef = collection(newNoteRef, 'labels');

    notes.forEach((note) => {
      const noteDoc = doc(notesRef);
      batch.set(noteDoc, note);
    });

    labels.forEach((label) => {
      const labelDoc = doc(labelRef, label);
      batch.set(labelDoc, {
        count: 1,
        time_stamp: serverTimestamp(),
      });
    });
    await batch.commit();
    navigate(ROUTES.LOGIN);
  } catch (error) {
    // console.error('Error creating initial database:', error);
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  navigate: NavigateFunction
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }
    signUpUser(userCredential.user.uid, navigate);
  } catch (error) {
    // console.error('Error creating account:', error);
  }
};
