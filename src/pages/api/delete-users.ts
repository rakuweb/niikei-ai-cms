import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import serviceAccount from 'niikei-391305-335457312a7a.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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
