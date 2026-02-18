import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN_CREDENTIALS } from 'constants/env';
const credentials = JSON.parse(Buffer.from(FIREBASE_ADMIN_CREDENTIALS, 'base64').toString());
import fs from 'fs';
import csv from 'csv-parser';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: 'https://niikei-11666.firebaseio.com',
  });
}

export default async function exportDocuments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = admin.firestore();

  fs.createReadStream('output-documents.csv')
    .pipe(csv())
    .on('data', async (row) => {
      await db.collection('documents').add(row);
    })
    .on('end', () => {
      console.log('end');
    });

  res.status(200).json({ message: 'success' });
}
