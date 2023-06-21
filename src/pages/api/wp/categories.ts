import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { WORDPRESS_URL } from 'constants/env';
import { apiRoutes } from 'constants/routes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Only GET requests are accepted` });
    return;
  }

  const url = WORDPRESS_URL
    ? `${WORDPRESS_URL}${apiRoutes.wpCategories}`
    : undefined;
  if (!url) {
    const categories = ['社会', '政治', '経済', '文化', '生活', 'ビジネス'];
    return res.status(200).json({ data: { categories } });
  }
  const response = await axios.get(url).catch((err) => {
    console.error(err);
    return null;
  });

  if (response === null) {
    const categories = ['社会', '政治', '経済', '文化', '生活', 'ビジネス'];
    return res
      .status(400)
      .json({ error: `Invalid request data`, data: { categories } });
  }

  res.status(201).json({ data: { categories: response.data } });
}
