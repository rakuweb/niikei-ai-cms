import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const storage = new Storage();
const client = new ImageAnnotatorClient();

async function deleteOldFiles(bucketName, prefix, newFileName) {
  const bucket = storage.bucket(bucketName);
  const [files] = await bucket.getFiles({ prefix: prefix });
  for (const file of files) {
    if (file.name !== newFileName) {
      await file.delete();
    }
  }
}

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
    const features = [{ type: 'DOCUMENT_TEXT_DETECTION' as const }];

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

      if (parsedText.responses) {
        for (const response of parsedText.responses) {
          if (response.fullTextAnnotation) {
            texts += response.fullTextAnnotation.text;
          }
        }
      }
    }

    await deleteOldFiles(bucketName, `${fileName}-result/`, `${fileName}.json`);

    return res.status(200).json({ text: texts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
