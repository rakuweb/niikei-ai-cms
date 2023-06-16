import { Timestamp, collection, getDocs } from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export type SiteType = {
  name: string;
  url: string;
  xpath: string;
  interval1: string;
  interval2: string;
  created_at: Timestamp;
  category: string;
  is_notified: boolean;
  is_renewal: boolean;
  previous_structure: Map<string, string>;
};

export const SITE_COLLECTION = 'sites';

export const fetchSites = async (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    SITE_COLLECTION
  );
  const snapshots = await getDocs(docsRef);
  const documents = snapshots.docs.map((document) => document.data());

  return documents;
};
