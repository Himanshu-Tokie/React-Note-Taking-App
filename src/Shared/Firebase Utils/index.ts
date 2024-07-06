import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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

export const updateNote = async (
  uid: string,
  noteId: string,
  content: string,
  title: string,
  label: string
) => {
  const parentDocRef = doc(db, 'user', uid);
  const nestedCollectionRef = collection(parentDocRef, 'notes');
  const noteRef = doc(nestedCollectionRef, noteId);
  updateDoc(noteRef, { content, title, label });
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

export const fetchLabels = async (uid: string) => {
  const parentDocRef = doc(db, 'user', uid);
  const nestedCollectionRef = collection(parentDocRef, 'labels');
  const querySnapshot = await getDocs(nestedCollectionRef);
  const labels = querySnapshot.docs.map((label) => ({ id: label.id }));
  return labels;
};

export const createLabel = async (
  uid: string,
  label: string,
  newLabel: boolean,
  labelData?: unknown
) => {
  const parentDocRef = doc(db, 'user', uid);
  const nestedCollectionRef = collection(parentDocRef, 'labels');
  const labelDataRef = doc(nestedCollectionRef, label);
  if (newLabel) {
    await setDoc(labelDataRef, labelData);
  } else await setDoc(labelDataRef, labelData);
};

export const updateLabel = async (
  uid: string,
  oldLabel: string,
  newLabel: string
) => {
  const parentDocRef = doc(db, 'user', uid);
  const labelCollectionRef = collection(parentDocRef, 'labels');
  const noteCollectionRef = collection(parentDocRef, 'notes');
  const labelDoc = doc(labelCollectionRef, oldLabel);
  const prevLabelData = await getDoc(labelDoc).then((labelData) =>
    labelData.data()
  );
  await deleteDoc(labelDoc);
  createLabel(uid, newLabel, false, prevLabelData);
  const batch = writeBatch(db);
  const q = query(noteCollectionRef, where('label', '==', oldLabel));
  const documents = await getDocs(q);
  documents.forEach((note) => {
    batch.update(note.ref, { label: newLabel });
  });
  await batch.commit();
};

export const deleteLabel = async (uid: string, label: string) => {
  const parentDocRef = doc(db, 'user', uid);
  const labelCollectionRef = collection(parentDocRef, 'labels');
  const noteCollectionRef = collection(parentDocRef, 'notes');
  const labelDoc = doc(labelCollectionRef, label);
  await deleteDoc(labelDoc);
  const batch = writeBatch(db);
  const q = query(noteCollectionRef, where('label', '==', label));
  const documents = await getDocs(q);
  documents.forEach((note) => {
    batch.delete(note.ref);
  });
  await batch.commit();
};
