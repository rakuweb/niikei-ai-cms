import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

import { NIIKEI39D3F } from 'constants/env';
import { COMPANY_COLLECTION } from '@/firebase/firestore/companies';
import { ARTICLE_COLLECTION, Status } from '@/firebase/firestore/articles';
import {
  DOCUMENT_COLLECTION,
  DocumentStatus,
} from '@/firebase/firestore/documents';

const credentials = JSON.parse(Buffer.from(NIIKEI39D3F, 'base64').toString());

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(400).end();
    return;
  }

  const { wp_id } = req.body;

  if (!wp_id) {
    res.status(400).end();
    return;
  }

  // targetのarticleを取得
  const db = admin.firestore();
  // WARN:
  const companyID = `FY6IW7OoqDSVNegL1QBhSWUUvir2`;
  const companyDocRef = db.collection(COMPANY_COLLECTION).doc(companyID);
  const articleCollectionRef = companyDocRef.collection(ARTICLE_COLLECTION);
  const articleQuery = articleCollectionRef.where('wp_id', '==', wp_id);
  const articleDocment = await articleQuery.get().catch((err) => {
    console.error(err);
    return null;
  });
  if (articleDocment === null) {
    res.status(500).end();
    return;
  }
  if (articleDocment.empty) {
    res.status(200).end();
    return;
  }
  // 対象は1つしかない想定
  const targetArticle = articleDocment.docs[0];
  const targetID = targetArticle.id;
  const { document_id } = targetArticle.data();
  const targetArticleDocRef = articleCollectionRef.doc(targetID);

  // statusを変更
  await targetArticleDocRef.update({ status: Status.Published });

  // ひもづくdocument_idを取得
  if (!document_id) {
    res.status(501).end();
    return;
  }
  const documentCollectionRef = db.collection(DOCUMENT_COLLECTION);
  const documentDocRef = documentCollectionRef.doc(document_id);
  // documentのstatusをfreeへ
  await documentDocRef.update({ status: DocumentStatus.Free });

  res.status(201).end();
};

export default handler;
