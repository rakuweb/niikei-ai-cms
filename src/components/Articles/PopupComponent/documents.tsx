// src/components/Articles/PopupComponent/documents.tsx
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from 'src/firebase';

export async function fetchFreeDocument() {
  const q = query(
    collection(db, 'documents'),
    where('status', '==', 'free'),
    orderBy('created_at'),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    throw new Error('No free document available');
  }

  return querySnapshot; // ここを変更しました
}
