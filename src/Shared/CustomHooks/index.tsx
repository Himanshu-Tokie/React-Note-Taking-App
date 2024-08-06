import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { db } from '../../Services/Config/Firebase/firebase';
import { AppDispatch } from '../../Store';
import { setUpdatedLabel } from '../../Store/Label';
import { labelProps } from '../../Views/Label/types';
import { FIREBASE_STRINGS } from '../Constants';

// listner for label update as somthing changes
export const useUpdateLabel = (
  uid: string,
  setData: (key: { id: string; labelId: string }[]) => void
) => {
  useEffect(() => {
    const labelsRef = collection(db, 'user', uid, 'labels');
    const q = query(labelsRef, orderBy('time_stamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    if (labelId) {
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
    }
    return undefined;
  }, [labelId, setData, uid]);
};

export const useLabelUpdate = (dispatch: AppDispatch, labelId: string) => {
  useEffect(() => {
    dispatch(setUpdatedLabel(labelId));
  }, [dispatch, labelId]);
};

export const useUpdateNote = (
  uid: string,
  setNoteData: (data: DocumentData) => void,
  noteId: string | null
) => {
  useEffect(() => {
    if (noteId) {
      const noteRef = doc(
        db,
        FIREBASE_STRINGS.USER,
        uid,
        FIREBASE_STRINGS.NOTES,
        noteId
      );
      const unsubscribe = onSnapshot(noteRef, (querySnapshot) => {
        const data = querySnapshot.data();
        if (data !== undefined) setNoteData(data);
      });
      return () => {
        unsubscribe();
      };
    }
    return () => {};
  }, [noteId, setNoteData, uid]);
};

type Timer = ReturnType<typeof setTimeout>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SomeFunction = (...args: any[]) => void;

export function useDebounce<T extends SomeFunction>(
  func: T,
  delayedTime: number
) {
  const timer = useRef<Timer>();
  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function debouncedFunction(...args: any[]) {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delayedTime);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }
  return debouncedFunction;
}

export function useBodyScrollToogler(show: boolean) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [show]);
}
