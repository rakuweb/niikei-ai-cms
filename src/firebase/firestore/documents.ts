import {
  collection,
  doc,
  getDocs,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export type DocumentType = {
  doc_id: string;
  url: string;
  status: Status;
};

export const Status = {
  Free: 'free',
  Using: 'using',
};
export type Status = (typeof Status)[keyof typeof Status];

export const DOCUMENT_COLLECTION = 'documents';

export const fetchFreeDocuments = async (companyID: string) => {
  const collectionRef = getDocumentDocsRef(companyID);
  const documentQuery = query(
    collectionRef,
    where('status', '==', Status.Free)
  );
  const snapshots = await getDocs(documentQuery);
  const documentsPromises = snapshots.docs.map(async (doc) => {
    const data = doc.data;
    const result = { ...data, id: doc.id };

    return result;
  });
  const documents = await Promise.all(documentsPromises);

  return documents;
};

export const getDocumentDocsRef = (companyID: string) => {
  const collectionRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    DOCUMENT_COLLECTION
  );

  return collectionRef;
};
