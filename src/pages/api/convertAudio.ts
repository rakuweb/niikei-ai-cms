import ffmpeg from 'fluent-ffmpeg';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { path } = req.body;

    ffmpeg(path)
      .audioBitrate(128)
      .save(`${path}-fixed.mp3`)
      .on('end', () => {
        res.status(200).json({ message: 'success' });
      })
      .on('error', (err) => {
        console.log('An error occurred: ', err.message);
        res.status(500).json({ message: 'error' });
      });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
