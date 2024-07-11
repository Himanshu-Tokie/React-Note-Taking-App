import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../Services/Config/Firebase/firebase';
import { AppDispatch } from '../../Store';
import { setLabel } from '../../Store/Label';
import { labelProps } from '../../Views/Label/types';

// listner for label update as somthing changes
export const useUpdateLabel = (
  uid: string,
  setData: (key: { id: string; labelId: string }[]) => void
) => {
  useEffect(() => {
    const labelsRef = collection(db, 'user', uid, 'labels');
    const unsubscribe = onSnapshot(labelsRef, (querySnapshot) => {
      const labels = querySnapshot.docs.map((item) => ({
        id: item.data().label,
        labelId: item.id,
      }));
      setData(labels);
    });
    return () => {
      unsubscribe();
    };
  }, [setData, uid]);
};

// listner for notes update as somthing changes
export const useUpdateNotes = (
  uid: string,
  setData: (key: labelProps[]) => void,
  labelId: string
) => {
  useEffect(() => {
    const parentDocRef = doc(db, 'user', uid);
    const nestedCollectionRef = collection(parentDocRef, 'notes');
    const labelRef = doc(parentDocRef, 'labels', labelId);
    const q = query(
      nestedCollectionRef,
      where('label', '==', labelRef),
      orderBy('time_stamp', 'desc')
    );
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
  }, [labelId, setData, uid]);
};

export const useLabelUpdate = (dispatch: AppDispatch, labelId: string) => {
  useEffect(() => {
    dispatch(setLabel(labelId));
  }, [dispatch, labelId]);
};
