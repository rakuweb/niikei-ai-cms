import { Timestamp, collection, getDocs } from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export const InformationStatus = {
  InReview: 'in_review',
  StandBy: 'stand_by',
  IsDeleted: 'is_deleted',
};
export type InformationStatus =
  (typeof InformationStatus)[keyof typeof InformationStatus];

export type InformationType = {
  created_at: Timestamp;
  message: string;
  title: string;
  url: string;
  status: string;
};

export const INFORMATION_COLLECTION = 'information';

export const fetchInformation = async (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    INFORMATION_COLLECTION
  );
  const snapshots = await getDocs(docsRef);
  const documents = snapshots.docs.map((document) => document.data());

  return documents;
};
