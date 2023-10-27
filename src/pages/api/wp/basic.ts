import { NextApiRequest, NextApiResponse } from 'next';

import { API_USER, API_PASSWORD } from 'constants/env';

// const API_USER = `rakuweb`;
// const API_PASSWORD = `hsD8 c77W tgdl TpA8 tW5T gASH`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Only GET requests are accepted` });
    return;
  }

  const basic = Buffer.from(`${API_USER}:${API_PASSWORD}`).toString('base64');

  res.status(201).json({ basic });
}
