var admin = require('firebase-admin');

var serviceAccount = require('niikei-39d3f-466153f0ce0d.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
  });
}
export default async (req, res) => {
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
