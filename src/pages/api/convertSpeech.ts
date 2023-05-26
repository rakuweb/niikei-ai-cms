import { SpeechClient, protos } from '@google-cloud/speech';

type IRecognitionConfig =
  protos.google.cloud.speech.v1p1beta1.IRecognitionConfig;
const bucketName = 'test-niikei';
export default async (req, res) => {
  const filename = req.body.filename;
  const gcsUri = `gs://${bucketName}/${filename}`;

  const audio = {
    uri: gcsUri,
  };

  const config: IRecognitionConfig = {
    encoding: 'MP3' as any,
    sampleRateHertz: 48000, // MP3 file's sample rate
    languageCode: 'ja-JP',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const client = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  const response = await client.recognize(request);
  const transcript = response[0].results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  res.status(200).json({ transcript });
};
