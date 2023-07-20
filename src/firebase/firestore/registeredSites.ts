import {
  Timestamp,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';
import { Category } from './sites';

export type SiteType = {
  id: string;
  name: string;
  url: string;
  xpath: string;
  interval1: string;
  interval2: string;
  created_at: Timestamp;
  category: Category;
  is_notified: boolean;
  is_renewal: boolean;
  is_auto_posts: boolean;
  previous_structure: string[];
};

export const SITE_COLLECTION = 'registered_sites';

export const fetchSites = async (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    SITE_COLLECTION
  );
  const snapshots = await getDocs(docsRef);
  // const documents = snapshots.docs.map((document) => document.data());
  const documents = snapshots.docs.map((document) => ({
    id: document.id, // Here is the document ID
    ...document.data(),
  }));

  return documents;
};

export const addSites = async (companyID: string, data: Partial<SiteType>) => {
  const collectionRef = getSiteCollectionRef(companyID);

  const storeData: Partial<SiteType> = { ...data, created_at: Timestamp.now() };
  await addDoc(collectionRef, { ...storeData }).catch((err) => {
    console.error(err);
    throw err;
  });
};
export const updateSites = async (
  companyID: string,
  id: string,
  data: Partial<SiteType>
) => {
  const docRef = doc(db, COMPANY_COLLECTION, companyID, SITE_COLLECTION, id);

  const updateData: Partial<SiteType> = { ...data };
  await updateDoc(docRef, updateData).catch((err) => {
    console.error(err);
    throw err;
  });
};
export const getSiteCollectionRef = (companyID: string) => {
  const collectionRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    SITE_COLLECTION
  );

  return collectionRef;
};
