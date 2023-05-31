import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const storage = new Storage();
const client = new ImageAnnotatorClient();

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
    const gcsSourceUri = `gs://${bucketName}/${fileName}`;
    const gcsDestinationUri = `gs://${bucketName}/${fileName}-result/`;

    const inputConfig = {
      mimeType: 'application/pdf',
      gcsSource: {
        uri: gcsSourceUri,
      },
    };
    const outputConfig = {
      gcsDestination: {
        uri: gcsDestinationUri,
      },
    };
    const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];
    const request = {
      requests: [
        {
          inputConfig: inputConfig,
          features: features,
          outputConfig: outputConfig,
        },
      ],
    };

    const operation = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation[0].promise();

    const outputConfigResult = filesResponse.responses[0].outputConfig;

    const textFiles = outputConfigResult.gcsDestination.uri;
    const files = await storage
      .bucket(bucketName)
      .getFiles({ prefix: textFiles.replace('gs://' + bucketName + '/', '') });

    let texts = '';
    for (const file of files[0]) {
      const [text] = await storage
        .bucket(bucketName)
        .file(file.name)
        .download();

      const parsedText = JSON.parse(text.toString());

      if (parsedText.responses[0].fullTextAnnotation) {
        texts += parsedText.responses[0].fullTextAnnotation.text;
      }
    }

    return res.status(200).json({ text: texts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
