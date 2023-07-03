import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
  });
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Invalid request method');
  }

  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteUser;
