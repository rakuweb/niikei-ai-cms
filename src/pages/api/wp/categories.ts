import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { WORDPRESS_URL } from 'constants/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Only GET requests are accepted` });
    return;
  }

  const url = WORDPRESS_URL
    ? `${WORDPRESS_URL}/wp-json/wp/v2/categories?per_page=100`
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
    return res.status(400).json({ error: `Invalid request data`, categories });
  }

  res.status(201).json({ categories: response.data });
}
