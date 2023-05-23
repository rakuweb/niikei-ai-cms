import { NextApiRequest, NextApiResponse } from 'next';
var admin = require('firebase-admin');
var serviceAccount = require('niikei-39d3f-466153f0ce0d.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://niikei-39d3f.firebaseio.com',
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Invalid request method');
  }

  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).send({ uid: userRecord.uid, token: customToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
