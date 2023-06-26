import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export type FortuneLogType = {
  id?: string;
  title: string;
  url: string;
  file_name: string;
  message: string;
  date: Timestamp;
  wp_id?: string;
};

export const FORTUNES_LOGS_COLLECTION = `fortunes_logs`;

export const addFortunesLog = async (
  companyID: string,
  data: Partial<FortuneLogType>
) => {
  const collectionRef = getFortunesLogCollectionRef(companyID);

  const storeData: Partial<FortuneLogType> = { ...data };
  const res = await addDoc(collectionRef, { ...storeData }).catch((err) => {
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

export const fetchFortuneLogs = async (companyID: string) => {
  const collectionRef = getFortunesLogCollectionRef(companyID);
  const snapshots = await getDocs(collectionRef);
  if (snapshots === null) return [];
  const documents = snapshots.docs.map((document) => {
    const data = document.data();
    const id = document.id;

    return { ...data, id };
  });

  return documents;
};
