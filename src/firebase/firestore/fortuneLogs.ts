import { Timestamp, addDoc, collection } from 'firebase/firestore';
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

export const addFortuneLog = async (
  companyID: string,
  data: Partial<FortuneLogType>
) => {
  const collectionRef = getFortuneLogCollectionRef(companyID);

  const storeData: Partial<FortuneLogType> = { ...data };
  const res = await addDoc(collectionRef, { ...storeData }).catch((err) => {
    console.error(err);
    throw err;
  });
};

export const getFortuneLogCollectionRef = (companyID: string) => {
  const collectionRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    FORTUNES_LOGS_COLLECTION
  );

  return collectionRef;
};
