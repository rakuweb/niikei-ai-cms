import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export type FortunesLogType = {
  id?: string;
  title: string;
  url: string;
  filename: string;
  message: string;
  date: Timestamp;
  wp_id?: string;
  used: boolean;
};

export const FORTUNES_LOGS_COLLECTION = `fortunes_logs`;

export const addFortunesLog = async (
  companyID: string,
  data: Partial<FortunesLogType>
) => {
  const collectionRef = getFortunesLogCollectionRef(companyID);

  const storeData: Partial<FortunesLogType> = { ...data };
  await addDoc(collectionRef, { ...storeData }).catch((err) => {
    console.error(err);
    throw err;
  });
};

export const getFortunesLogCollectionRef = (companyID: string) => {
  const collectionRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    FORTUNES_LOGS_COLLECTION
  );

  return collectionRef;
};

export const fetchFortunesLogs = async (companyID: string) => {
  const collectionRef = getFortunesLogCollectionRef(companyID);
  const snapshots = await getDocs(
    query(collectionRef, orderBy('date', 'desc'))
  );
  if (snapshots === null) return [];
  const documents = snapshots.docs.map((document) => {
    const data = document.data();
    const id = document.id;

    return { ...data, id };
  });

  return documents;
};

export const deleteFortunesLogs = async (
  companyID: string,
  fortunesLogID: string
) => {
  const docRef = getFortunesLogDocRef(companyID, fortunesLogID);
  await deleteDoc(docRef);
};

export const getFortunesLogDocRef = (
  companyID: string,
  fortunesLogID: string
) => {
  const docRef = doc(
    db,
    COMPANY_COLLECTION,
    companyID,
    FORTUNES_LOGS_COLLECTION,
    fortunesLogID
  );

  return docRef;
};

export const updateFortunesLog = async (
  IDs: { companyID: string; fortunesLogID: string },
  data: Partial<FortunesLogType>
) => {
  const docRef = getFortunesLogDocRef(IDs.companyID, IDs.fortunesLogID);

  await updateDoc(docRef, data);
};
