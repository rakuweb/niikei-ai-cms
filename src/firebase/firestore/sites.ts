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
  is_auto_patrol: boolean;
  previous_structure: string[];
  previous_target: string;
};
export type Category = { id: number; name: string };

export const SITE_COLLECTION = 'sites';

export const switchAutoPatrol = async (
  id: { companyID: string; siteID: string },
  data: boolean
) => {
  const { companyID, siteID } = id;
  const reqestData = { is_auto_patrol: data };
  await updateSites(companyID, siteID, reqestData).catch((err) => {
    throw err;
  });
};

export const fetchSites = async (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    SITE_COLLECTION
  );
  const snapshots = await getDocs(docsRef);
  const documents = snapshots.docs.map((document) => ({
    id: document.id, // Here is the document ID
    ...document.data(),
  }));

  return documents;
};

export const addSites = async (companyID: string, data: Partial<SiteType>) => {
  const collectionRef = getSiteCollectionRef(companyID);

  const storeData: Partial<SiteType> = {
    ...data,
    created_at: Timestamp.now(),
    is_renewal: false,
    previous_structure: [],
    previous_target: '',
  };
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
