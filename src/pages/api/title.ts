import { google } from 'googleapis';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const docs = google.docs({ version: 'v1', auth });

export const maxDuration = 300;

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }
  try {
    const documentId = url.split('/')[5];
    const response = await docs.documents.get({ documentId: documentId });
    const title = response.data.title;
    res.status(200).json({ title: title });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
