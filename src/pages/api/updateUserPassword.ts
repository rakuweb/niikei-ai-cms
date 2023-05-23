import admin from 'firebase-admin';
import serviceAccount from 'niikei-39d3f-466153f0ce0d.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
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
