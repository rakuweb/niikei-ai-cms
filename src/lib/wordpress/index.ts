import { WORDPRESS_URL } from 'constants/env';
import axios from 'axios';

const WORDPRESS_API_ORIGIN = `${WORDPRESS_URL}/wp-json`;
const API_USER = `rakuweb`;
const API_PASSWORD = `hsD8 c77W tgdl TpA8 tW5T gASH`;

export const uploadImages = async (props: {
  contentType: string;
  filename: string;
  file: Blob;
}) => {
  const { contentType, filename, file } = props;
  const url = `${WORDPRESS_API_ORIGIN}/wp/v2/media`;
  const data = new FormData();
  data.append('title', filename);
  data.append('file', file);

  const res = await axios
    .post(
      url,
      { ...data },
      {
        headers: {
          'Content-Type': `${contentType}`,
          'Content-Disposition': `attachment; filename=${filename}`,
        },
        auth: {
          username: API_USER,
          password: API_PASSWORD,
        },
      }
    )
    .catch((err) => {
      console.error(err);
      return null;
    });

  if (res === null) {
    alert(
      `アップロードに失敗しました。時間がたってからもう一度お試しください。`
    );
    return null;
  }

  return res;
};
