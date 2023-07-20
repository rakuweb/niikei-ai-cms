import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { NIIKEI39D3F } from 'constants/env';
const credentials = JSON.parse(Buffer.from(NIIKEI39D3F, 'base64').toString());

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
  });
}

export default async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password, role, is_company, company_ref } = req.body;
    try {
      const userRecord = await admin.auth().createUser({
        displayName: name,
        email,
        password,
      });

      const db = admin.firestore();
      const userRef = db.collection('users').doc(userRecord.uid);
      const companyRef = db
        .collection('companies')
        .doc(is_company ? userRecord.uid : company_ref)
        .collection('employees')
        .doc(userRecord.uid);

      await db.runTransaction(async (transaction) => {
        transaction.set(userRef, {
          is_company,
          company_ref,
        });

        transaction.set(companyRef, {
          name,
          email,
          role,
        });
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating new user:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'Only POST requests are accepted' });
  }
}
