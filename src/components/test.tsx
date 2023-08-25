import { useCallback, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';

const IndexPage = () => {
  const { handleSubmit } = useForm({
    defaultValues: { name: '', iconUrl: '' },
  });
  const [file, setFile] = useState<File>();
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };
  const uploadImg = useCallback(async (file: File) => {
    const fileName = 'imgfile2';
    const res = await fetch(`/api/upload-file?file=${fileName}`);
    const { url, fields } = await res.json();
    const body = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      body.append(key, value as string | Blob);
    });
    const upload = await fetch(url, { method: 'POST', body });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');
    }
  }, []);

  const handleClick = handleSubmit(async () => {
    if (file) {
      uploadImg(file);
    }
  });
  return (
    <>
      <div>
        写真
        <input type="file" accept="*" onChange={handleChangeFile} id="icon" />
        <input type="submit" onClick={handleClick} />
      </div>
    </>
  );
};

export default IndexPage;

test('ダミー', () => {
  expect(1).toBe(1);
});
