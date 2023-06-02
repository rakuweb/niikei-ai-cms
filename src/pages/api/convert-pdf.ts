import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const drive = google.drive('v3');
const docs = google.docs('v1');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileName = 'pdftext';
  const bucketName = 'niikei2';
  if (!bucketName || !fileName) {
    return res
      .status(400)
      .json({ error: 'bucketName and fileName are required' });
  }

  try {
    // Download the PDF file from Cloud Storage
    const filePath = path.join('/tmp', fileName);
    await storage
      .bucket(bucketName)
      .file(fileName)
      .download({ destination: filePath });

    // Upload the PDF file to Google Drive and convert it into Google Docs format
    const driveResponse = await drive.files.create({
      requestBody: {
        name: fileName,
      },
      media: {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath),
      },
      fields: 'id',
      supportsAllDrives: true,
    });

    const fileId = driveResponse.data.id;

    // Get the content of the Google Docs document as text
    const docsResponse = await docs.documents.get({
      documentId: fileId,
      fields: 'body/content',
    });

    let text = '';
    for (const content of docsResponse.data.body.content) {
      if (content.paragraph) {
        for (const element of content.paragraph.elements) {
          if (element.textRun) {
            text += element.textRun.content;
          }
        }
      }
    }

    // Delete the temporary file and the Google Docs document
    fs.unlinkSync(filePath);
    await drive.files.delete({ fileId: fileId });

    return res.status(200).json({ text: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
