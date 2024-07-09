import { doc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../Services/Config/Firebase/firebase';
import { labelProps } from '../../Views/Label/types';

export const useUpdateLabel = (
  uid: string,
  setData: (key: { id: string }[]) => void
) => {
  useEffect(() => {
    const parentDocRef = doc(db, 'user', uid);
    const nestedCollectionRef = collection(parentDocRef, 'labels');
    const unsubscribe = onSnapshot(nestedCollectionRef, (querySnapshot) => {
      const labels = querySnapshot.docs.map((label) => ({ id: label.id }));
      setData(labels);
    });
    return () => {
      unsubscribe();
    };
  }, [setData, uid]);
};

export const useUpdateNotes = (
  uid: string,
  setData: (key: labelProps[]) => void,
  label: string
) => {
  useEffect(() => {
    const parentDocRef = doc(db, 'user', uid);
    const nestedCollectionRef = collection(parentDocRef, 'notes');
    const q = query(nestedCollectionRef, where('label', '==', label));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = querySnapshot.docs.map((note) => {
        return {
          noteId: note.id,
          content: note.data().content,
          label: note.data().label,
          title: note.data().title,
          time_stamp: note.data().time_stamp,
        };
      });
      setData(notes);
    });
    return () => {
      unsubscribe();
    };
  }, [label, setData, uid]);
};
