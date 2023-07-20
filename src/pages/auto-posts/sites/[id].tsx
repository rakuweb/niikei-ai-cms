import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
import { Timestamp } from 'firebase/firestore';
import { Box, Spinner } from '@chakra-ui/react';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from 'lib/store';
import { Sidebar } from 'components/Sidebar';
import { AddAutoPost } from '@/components/AddAutoPost';
import { Category } from '@/firebase/firestore/sites';

type UserData = {
  id?: string;
  name?: string;
  url?: string;
  xpath?: string;
  interval1?: string;
  interval2?: string;
  created_at?: Timestamp;
  category?: Category;
  is_notified?: boolean;
  is_renewal?: boolean;
  is_auto_posts: boolean;
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
            const companyDocRef = doc(ref, 'registered_sites', iid as string);
            const companyDocSnap = await getDoc(companyDocRef);

            if (companyDocSnap.exists()) {
              setData(companyDocSnap.data() as UserData);
            }
          }
        }
      }
    } catch (error) {
      router.push('/signin');
    }
  };

  if (!data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#49BAC0"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <>
      <Sidebar />
      <Box>
        <AddAutoPost data={data} id={id as string} />
      </Box>
    </>
  );
};

export default SitePage;
