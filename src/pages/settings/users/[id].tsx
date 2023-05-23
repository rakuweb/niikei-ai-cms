import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { Sidebar } from 'components/Sidebar';
import { Renew } from 'components/Renew';
import { NextPage } from 'next';

type DataType = {
  role: string;
  email: string;
  name: string;
  password: string;
  id: string;
};

const UserPage: NextPage = () => {
  const [data, setData] = useState<DataType | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // ①db, 'employees', idにあるrefフィールドの文字列を取得
          const employeeDocRef = doc(db, 'employees', id as string);
          const employeeDocSnap = await getDoc(employeeDocRef);

          if (employeeDocSnap.exists()) {
            const ref = employeeDocSnap.data()?.ref;

            if (ref) {
              // ②db,'company',refフィールドの文字列,'employees', idにアクセスして情報を取得
              const companyDocRef = doc(
                db,
                'company',
                ref,
                'employees',
                id as string
              );
              const companyDocSnap = await getDoc(companyDocRef);

              if (companyDocSnap.exists()) {
                setData(companyDocSnap.data() as DataType);
              }
            }
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
