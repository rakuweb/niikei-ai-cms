import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { Sidebar } from 'components/Sidebar';
import { Renew } from 'components/Renew';
import { NextPage } from 'next';
import { auth } from 'src/firebase';

type DataType = {
  role: string;
  email: string;
  name: string;
  password: string;
};

const UserPage: NextPage = () => {
  const [data, setData] = useState<DataType | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const user = auth.currentUser; // 現在のログインユーザーを取得

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const docRef = doc(db, 'employees', id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data() as DataType);
          }
        }
      } catch (error) {
        router.push('/signin');
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }
  if (user && user.uid !== id) {
    return <div>このページにはアクセスできません。</div>;
  }

  return (
    <>
      <Sidebar />
      <Box>
        <Renew data={data} />
      </Box>
    </>
  );
};

export default UserPage;
