import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { NIIKEI39D3F } from 'constants/env';
const credentials = JSON.parse(Buffer.from(NIIKEI39D3F, 'base64').toString());
import { Parser } from 'json2csv';
import fs from 'fs';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
  });
}

export default async function exportDocuments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = admin.firestore();
  const documentsCollectionRef = db.collection('documents');
  const documentSnapshots = await documentsCollectionRef.get();
  const documents = documentSnapshots.docs.map((snapshot) => ({
    ...snapshot.data(),
  }));

  const json2csv = new Parser();
  const csv = json2csv.parse(documents);
  fs.writeFile('output-documents.csv', csv, function (err) {
    if (err) throw err;
    console.log('csv error');
  });
  res.status(200).json({ message: 'success' });
}
