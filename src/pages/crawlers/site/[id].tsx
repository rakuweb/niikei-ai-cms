import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
import * as admin from 'firebase-admin';
import { Box } from '@chakra-ui/react';
import { Add } from 'components/Add';
import { getAuth } from 'firebase/auth';

type UserData = {
  id?: string;
  name?: string;
  url?: string;
  xpath?: string;
  interval1?: string;
  interval2?: string;
  created_at?: admin.firestore.Timestamp;
  category?: string;
  is_notified?: boolean;
  is_renewal?: boolean;
};

const SitePage: NextPage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const employeeDocRef = doc(db, 'users', id as string);
          const employeeDocSnap = await getDoc(employeeDocRef);

          if (employeeDocSnap.exists()) {
            const ref = employeeDocSnap.data()?.company_ref;

            if (ref) {
              const companyDocRef = doc(
                db,
                'companies',
                ref,
                'sites',
                id as string
              );
              const companyDocSnap = await getDoc(companyDocRef);

              if (companyDocSnap.exists()) {
                setData(companyDocSnap.data() as UserData);
              }
            }
          }
        }
        console.log(data);
      } catch (error) {
        router.push('/signin');
      }
    };

    fetchData();
  }, [id]);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box>
      <Add data={data} />
    </Box>
  );
};

export default SitePage;
