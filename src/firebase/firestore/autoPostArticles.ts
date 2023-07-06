import {
  Timestamp,
  collection,
  getDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export const Status = {
  Editing: 'editing',
  Checking: 'checking',
  Fixing: 'fixing',
  Published: 'published',
  IsDeleted: 'is_deleted',
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export type ArticleType = {
  title: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  url: string;
  document_id: string;
  status: string;
  created_by: string;
  due_date: Timestamp;
  category: string;
  wp_url: string;
  name: string;
};
export type User = {
  name: string;
};
export const ARTICLE_COLLECTION = 'auto_post_articles';

export const fetchArticles = async (companyID: string) => {
  const docsRef = getArticleDocsRef(companyID);

  const snapshots = await getDocs(docsRef);
  const documentsPromises = snapshots.docs.map(async (document) => {
    const data = document.data();
    const createdByRef = data.created_by;
    const createdBySnap = await getDoc(doc(db, createdByRef));
    const createdByData = createdBySnap.data();
    const name = createdByData ? createdByData.name : '';
    return { ...data, name };
  });

  const result = await Promise.allSettled(documentsPromises);
  const documents = result
    .filter((item) => item?.status === 'fulfilled')
    .map((item) => (item as PromiseFulfilledResult<any>).value);

  console.log(documents);
  return documents;
};

export const getArticleDocsRef = (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    ARTICLE_COLLECTION
  );

  return docsRef;
};
