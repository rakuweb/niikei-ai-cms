import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';
import axios from 'axios';

import {
  TWITTER_APP_USER_TOKEN,
  FACEBOOK_ACCESS_TOKEN,
  FACEBOOK_PAGE_ID,
} from 'constants/env';

const facebookPageId = FACEBOOK_PAGE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: `Only POST requests are accepted` });
    return;
  }

  const message = ``;

  // twitter
  const twitterClient = new TwitterApi(TWITTER_APP_USER_TOKEN);
  const writeClient = twitterClient.readWrite;

  const { data: createdTweet } = await writeClient.v2
    .tweet(message)
    .catch((err) => {
      console.error(err);
      return null;
    });

  // facebook
  const url = `https://graph.facebook.com/${facebookPageId}/feed`;
  const response = await axios
    .post(url, {
      message: message,
      access_token: FACEBOOK_ACCESS_TOKEN,
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (createdTweet === null || response === null)
    return res.status(400).json({ error: `Invalid request data` });

  res
    .status(201)
    .json({ data: { twitter: createdTweet, facebook: response.data } });
}
