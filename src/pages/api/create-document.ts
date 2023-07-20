import { NextApiRequest, NextApiResponse } from 'next';
import { docs_v1, drive_v3, google } from 'googleapis';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

import {
  GOOGLE_APPLICATION_CREDENTIALS_CREATE_DOCUMENT,
  GOOGLE_TEMPLATE_DOCUMENT_ID,
  GOOGLE_PARENT_FOLDER,
} from 'constants/env';
import { openAiRequest } from 'lib/openai';

const credentials = JSON.parse(
  Buffer.from(
    GOOGLE_APPLICATION_CREDENTIALS_CREATE_DOCUMENT,
    'base64'
  ).toString()
);

const copyDocument = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, text } = req.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/documents',
      ],
    });

    const drive: drive_v3.Drive = google.drive({ version: 'v3', auth });
    const documentMetadata = {
      name: title,
      parents: [GOOGLE_PARENT_FOLDER],
      // parents: ['1MTtd2Kd3J7vyS3RraDtqQh1vMJLslWkO'],
    };

    const copiedDocument = await drive.files.copy({
      fileId: GOOGLE_TEMPLATE_DOCUMENT_ID,
      // fileId: '1Zyb5JFlDyBsTIqHYiMFZibXbGscTQ3Vo5XO2zhFfSyc',
      requestBody: documentMetadata,
    });

    const { id: documentId } = copiedDocument.data;

    const document = await drive.files.get({
      fileId: documentId,
      fields: 'webViewLink',
    });

    const url = document.data.webViewLink;

    // chatGPT
    let inputText = '';
    if (text) {
      const message = `下記の文章を記事風に要約してください。\n\n${text}`;
      const requestMessages = [
        { content: message, role: ChatCompletionRequestMessageRoleEnum.User },
      ];
      const resChat = await openAiRequest(requestMessages);

      if (!resChat) {
        inputText = `ChatGPT APIへの接続に失敗したため、要約文を生成できませんでした。
        代わりに原文を挿入しました。

${text}

----------------------------`;
      } else {
        const choise = resChat.choices[0];
        inputText = `${choise.message?.content ?? ''}

----------------------------`;
      }
    }

    const docs: docs_v1.Docs = google.docs({
      version: 'v1',
      auth,
    });
    const requests = inputText
      ? [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: inputText,
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
