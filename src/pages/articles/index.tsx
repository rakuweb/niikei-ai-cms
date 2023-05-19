import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../src/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from 'src/firebase';
import { Articles } from 'components/Articles';
type UserData = {
  role: string;
  email: string;
  name: string;
  id: string;
};

const Articleslist: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();
  const user = auth.currentUser;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const allowedEmailsRef = collection(db, 'companies');
        const querySnapshot = await getDocs(allowedEmailsRef);

        const fetchedData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            ...(doc.data() as { role: string; email: string; name: string }),
          });
          fetchedData.push({
            id: doc.id,
            ...(doc.data() as { role: string; email: string; name: string }),
          });
        });

        setData(fetchedData);
      } catch (error) {
        router.push('/signin');
      }
    };

    fetchUserData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  // if (user && user.uid !== process.env.NEXT_PUBLIC_COMPANIES) {
  //   return <div>このページにはアクセスできません。</div>;
  // }

  return (
    <>
      <Sidebar />
      <Box>
        <Articles data={data} currentPage={0} />
      </Box>
    </>
  );
};

export default Articleslist;
