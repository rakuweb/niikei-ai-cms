import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { WORDPRESS_URL } from 'constants/env';
const API_USER = `rakuweb`;
const API_PASSWORD = `hsD8 c77W tgdl TpA8 tW5T gASH`;

export const maxDuration = 300;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: `Only POST requests are accepted` });
    return;
  }

  const url = WORDPRESS_URL
    ? `${WORDPRESS_URL}/wp-json/wp/v2/media`
    : undefined;
  if (!url) {
    return res.status(400).json({ error: `Invalid request data` });
  }
  const body = req?.body;
  const { filename } = body;
  console.log(filename);
  const response = await axios
    .post(url, body, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Content-Disposition': `attachment; filename=test.png`,
        // Authorization: `Basic ${Buffer.from(
        //   `${API_USER}:${API_PASSWORD}`
        // ).toString('base64')}`,
      },
      auth: {
        username: API_USER,
        password: API_PASSWORD,
      },
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (response === null) {
    return res.status(400).json({ error: `Invalid request data` });
  }

  res.status(201).json({ ...response.data });
}
