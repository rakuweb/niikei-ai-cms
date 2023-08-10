import {
  Timestamp,
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
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
export const AUTO_POST_ARTICLE_COLLECTION = 'auto_post_articles';

export const fetchArticles = async (companyID: string) => {
  const docsRef = getArticleDocsRef(companyID);

  const snapshots = await getDocs(
    query(docsRef, orderBy('date', 'desc'))
  );
  const documentsPromises = snapshots.docs.map(async (document) => {
    const data = document.data();
    return { ...data, id: document.id };
  });

  const result = await Promise.allSettled(documentsPromises);
  const documents = result
    .filter((item) => item?.status === 'fulfilled')
    .map((item) => (item as PromiseFulfilledResult<any>).value);

  return documents;
};

export const deleteAutoPostArticle = async (
  companyID: string,
  articleID: string
) => {
  const docRef = getArticleDocRef(companyID, articleID);
  await deleteDoc(docRef).catch((err) => {
    console.error(err);
    throw err;
  });
};

export const getArticleDocsRef = (companyID: string) => {
  const docsRef = collection(
    db,
    COMPANY_COLLECTION,
    companyID,
    AUTO_POST_ARTICLE_COLLECTION
  );

  return docsRef;
};

export const getArticleDocRef = (companyID: string, articleID: string) => {
  const docRef = doc(
    db,
    COMPANY_COLLECTION,
    companyID,
    AUTO_POST_ARTICLE_COLLECTION,
    articleID
  );

  return docRef;
};
