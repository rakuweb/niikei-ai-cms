import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
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
};

export const ARTICLE_COLLECTION = 'articles';

export const fetchArticlesWhere = async (companyID: string, status: Status) => {
  const docsRef = getArticleDocsRef(companyID);

  const articleQuery = query(docsRef, where('status', '==', status));
  const snapshots = await getDocs(articleQuery);
  const documents = snapshots.docs.map((document) => document.data());

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
