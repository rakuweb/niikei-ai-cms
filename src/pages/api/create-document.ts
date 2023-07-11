import { NextApiRequest, NextApiResponse } from 'next';
import { docs_v1, drive_v3, google } from 'googleapis';

const copyDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, text, accessToken } = req.body;

  try {
    // アクセストークンを使用してOAuth2クライアントを作成します
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const drive: drive_v3.Drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });

    // Define the ID of the document to be copied
    const templateDocumentId = '1ChARyTPMZzrH5ms9hbctEPpnIyynhWN95s4aUuqsRYE';
    const documentCopy = await drive.files.copy({
      fileId: templateDocumentId,
      requestBody: {
        name: title,
        parents: ['1MTtd2Kd3J7vyS3RraDtqQh1vMJLslWkO'],
      },
    });

    const { id: documentId } = documentCopy.data;

    const document = await drive.files.get({
      fileId: documentId,
      fields: 'webViewLink',
    });

    const url = document.data.webViewLink;

    const docs: docs_v1.Docs = google.docs({
      version: 'v1',
      auth: oauth2Client,
    });
    const requests = text
      ? [
          {
            insertText: {
              location: {
                index: 1,
              },
              text,
            },
          },
        ]
      : [];

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests,
        },
      });
    }

    res.status(200).json({ documentId, url });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Failed to create document' });
  }
};

export default copyDocument;
