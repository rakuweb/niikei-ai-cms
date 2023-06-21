import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
import { Timestamp } from 'firebase/firestore';
import { Box } from '@chakra-ui/react';
import { Add } from 'components/Add';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from 'lib/store';
import { Sidebar } from 'components/Sidebar';

type UserData = {
  id?: string;
  name?: string;
  url?: string;
  xpath?: string;
  interval1?: string;
  interval2?: string;
  created_at?: Timestamp;
  category?: string;
  is_notified?: boolean;
  is_renewal?: boolean;
};

const SitePage: NextPage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const iid = id;

  const { setCurrentUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchData(user.uid);
      }
    });

    return () => unsubscribe();
  }, [iid]);

  const fetchData = async (uid: string) => {
    try {
      if (iid) {
        const employeeDocRef = doc(db, 'users', uid);
        const employeeDocSnap = await getDoc(employeeDocRef);

        if (employeeDocSnap.exists()) {
          const ref = employeeDocSnap.data()?.company_ref;

          if (ref) {
            const companyDocRef = doc(ref, 'sites', iid as string);
            const companyDocSnap = await getDoc(companyDocRef);

            if (companyDocSnap.exists()) {
              setData(companyDocSnap.data() as UserData);
            }
          }
        }
      }
    } catch (error) {
      // router.push('/signin');
    }
  };

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Sidebar />
      <Box>
        <Add data={data} id={id as string} />
      </Box>
    </>
  );
};

export default SitePage;
