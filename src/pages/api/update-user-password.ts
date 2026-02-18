import admin from 'firebase-admin';
import { FIREBASE_ADMIN_CREDENTIALS } from 'constants/env';
const credentials = JSON.parse(Buffer.from(FIREBASE_ADMIN_CREDENTIALS, 'base64').toString());

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: 'https://niikei-11666.firebaseio.com',
  });
}

const updateUserPassword = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Invalid request method');
  }

  const { uid, newPassword } = req.body;

  try {
    await admin.auth().updateUser(uid, { password: newPassword });
    res.status(200).send('User password updated');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default updateUserPassword;
