import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../../Services/Config/Firebase/firebase';
import { AppDispatch } from '../../Store';
import { setLoading } from '../../Store/Loader';
import { FIREBASE_STRINGS, NOTES } from '../Constants';

export async function fetchNotesWithLabel(labelId: string, userId: string) {
  const labelDocRef = doc(
    db,
    FIREBASE_STRINGS.USER,
    userId,
    FIREBASE_STRINGS.LABELS,
    labelId
  );
  const notesRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    userId,
    FIREBASE_STRINGS.NOTES
  );
  const notesQuery = query(
    notesRef,
    where(FIREBASE_STRINGS.LABEL, '==', labelDocRef)
  );

  const notesSnapshot = await getDocs(notesQuery);
  const notes = notesSnapshot.docs.map((note) => {
    return {
      noteId: note.id,
      content: note.data().content,
      label: note.data().label,
      title: note.data().title,
      time_stamp: note.data().time_stamp,
    };
  });
  return notes;
}

export async function fetchAllNotes(uid: string) {
  const noteRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.NOTES
  );
  const notesData = getDocs(noteRef);
  return notesData;
}
export async function fetchNote(userId: string, noteId: string | null) {
  if (noteId) {
    const noteRef = doc(
      db,
      FIREBASE_STRINGS.USER,
      userId,
      FIREBASE_STRINGS.NOTES,
      noteId
    );
    const noteData = await getDoc(noteRef);
    return noteData;
  }
  return null;
}
export async function fetchSearchNotes(uid: string, qs: string) {
  const notesRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.NOTES
  );
  const qu = query(
    notesRef,
    orderBy('title'),
    startAt(qs),
    endAt(`${qs}\uf8ff`)
  );
  const querySnapshot = await getDocs(qu);
  const allNotesData = querySnapshot.docs.map((note) => {
    return {
      noteId: note.id,
      content: note.data().content,
      label: note.data().label,
      title: note.data().title,
      time_stamp: note.data().time_stamp,
    };
  });
  return allNotesData;
}
export async function deleteNotes(uid: string, noteId: string, theme: string) {
  const noteRef = doc(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.NOTES,
    noteId
  );
  const noteData = await getDoc(noteRef);
  const labelRef = noteData.data()?.label;
  if (noteData.data()) {
    await deleteDoc(noteRef);
    await updateDoc(labelRef, { count: increment(-1) });
    toast.success('Note deleted successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ?? 'light',
    });
  }
}
export const createNote = async (
  uid: string,
  content: string,
  labelId: string,
  title: string
) => {
  const labelRef = doc(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.LABELS,
    labelId
  );
  const noteRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.NOTES
  );
  await addDoc(noteRef, {
    content,
    label: labelRef,
    title,
    time_stamp: serverTimestamp(),
  });
  await updateDoc(labelRef, { count: increment(1) });
};

export const updateNote = async (
  uid: string,
  noteId: string,
  content: string,
  title: string
) => {
  const parentDocRef = doc(db, FIREBASE_STRINGS.USER, uid);
  const nestedCollectionRef = collection(parentDocRef, FIREBASE_STRINGS.NOTES);
  const noteRef = doc(nestedCollectionRef, noteId);
  updateDoc(noteRef, { content, title });
};

export const signUpUser = async (uid: string) => {
  try {
    const notes: Note[] = [
      {
        title: NOTES.ACADEMICS.TITLE,
        content: NOTES.ACADEMICS.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
        title: NOTES.OTHERS.TITLE,
        content: NOTES.OTHERS.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
        title: NOTES.PERSONAL.TITLE,
        content: NOTES.PERSONAL.CONTENT,
        url: [],
        time_stamp: serverTimestamp(),
      },
      {
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
    const newNoteRef = doc(db, FIREBASE_STRINGS.USER, uid);
    const notesRef = collection(newNoteRef, FIREBASE_STRINGS.NOTES);
    const labelRef = collection(newNoteRef, FIREBASE_STRINGS.LABELS);

    labels.forEach((label, index) => {
      const labelDoc = doc(labelRef);
      batch.set(labelDoc, {
        count: 1,
        label,
        time_stamp: serverTimestamp(),
      });
      notes[index].label = labelDoc;
    });
    notes.forEach((note) => {
      const noteDoc = doc(notesRef);
      batch.set(noteDoc, note);
    });
    await batch.commit();
  } catch (error) {
    // console.error('Error creating initial database:', error);
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
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
    await signUpUser(userCredential.user.uid);
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    // console.log(error);
    // ShowAlertMessage Dispatch
  }
};

export const fetchLabels = async (uid: string) => {
  const labelsRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.LABELS
  );
  const labelData = await getDocs(labelsRef);
  const labels = labelData.docs.map((item) => ({
    id: item.data().label,
    labelId: item.id,
  }));
  return labels;
};

export const createLabel = async (uid: string, labelName: string) => {
  const labelRef = collection(
    db,
    FIREBASE_STRINGS.USER,
    uid,
    FIREBASE_STRINGS.LABELS
  );
  await addDoc(labelRef, {
    count: 0,
    label: labelName,
    time_stamp: serverTimestamp(),
  });
};

export const updateLabel = async (
  uid: string,
  labelName: string,
  labelId: string,
  dispatch: AppDispatch
) => {
  dispatch(setLoading(true));
  const parentDocRef = doc(db, FIREBASE_STRINGS.USER, uid);
  const labelCollectionRef = doc(
    parentDocRef,
    FIREBASE_STRINGS.LABELS,
    labelId
  );
  updateDoc(labelCollectionRef, { label: labelName });
  dispatch(setLoading(false));
};

export const deleteLabel = async (
  uid: string,
  labelId: string,
  dispatch: AppDispatch
) => {
  dispatch(setLoading(true));
  const parentDocRef = doc(db, FIREBASE_STRINGS.USER, uid);
  const labelCollectionRef = collection(parentDocRef, FIREBASE_STRINGS.LABELS);
  const noteCollectionRef = collection(parentDocRef, FIREBASE_STRINGS.NOTES);
  const labelRef = doc(labelCollectionRef, labelId);
  const batch = writeBatch(db);
  const q = query(
    noteCollectionRef,
    where(FIREBASE_STRINGS.LABEL, '==', labelRef)
  );
  const documents = await getDocs(q);
  documents.forEach((note) => {
    batch.delete(note.ref);
  });
  await batch.commit();
  await deleteDoc(labelRef);
  dispatch(setLoading(false));
};
