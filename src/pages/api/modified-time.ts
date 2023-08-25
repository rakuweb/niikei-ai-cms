import { google } from 'googleapis';

import { GOOGLE_APPLICATION_CREDENTIALS } from 'constants/env';

const credentials = JSON.parse(
  Buffer.from(GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  // WARN:
  // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).json({ error: 'Missing url parameter' });
    return;
  }
  try {
    const documentId = url.split('/')[5];
    const response = await drive.files.get({
      fileId: documentId,
      fields: 'modifiedTime',
    });
    const modifiedTime = response.data.modifiedTime;
    res.status(200).json({ modifiedTime: modifiedTime });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
