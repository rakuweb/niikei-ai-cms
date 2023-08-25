import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Sidebar } from 'components/Sidebar';
import { Collections } from 'components/Collections';
import { auth, db } from '@/firebase';
import {
  INFORMATION_COLLECTION,
  InformationStatus,
  InformationType,
} from '@/firebase/firestore/information';
import { SiteType } from '@/firebase/firestore/registeredSites';

type InformationData = InformationType & {
  id?: string;
  siteName?: string;
  siteUrl: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<InformationData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        if (user) {
          const employeeDocRef = doc(db, 'users', user.uid as string);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;
          const allowedEmailsRef = collection(ref, INFORMATION_COLLECTION);

          const q = query(
            allowedEmailsRef,
            where('status', '==', InformationStatus.InReview)
          );
          const querySnapshot = await getDocs(q);

          const fetchedData: InformationData[] = [];
          await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const docData = doc.data() as InformationData;
              const siteRefSnap = await getDoc(docData.site_ref);
              const siteData = siteRefSnap.data() as SiteType;

              fetchedData.push({
                ...docData,
                siteName: siteData.name,
                siteUrl: siteData.url,
                id: doc.id,
                category: siteData?.category || { id: undefined, name: '' },
              });
            })
          );
          fetchedData.sort(
            (a, b) =>
              b.created_at.toDate().getTime() - a.created_at.toDate().getTime()
          );
          setData(fetchedData);
        } else {
          router.push('/');
        }
      } catch (error) {
        window.alert(error);
        console.log(error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, () => {
      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

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
        <Collections titles="新着情報一覧" data={data} />
      </Box>
    </>
  );
};
export default Home;
