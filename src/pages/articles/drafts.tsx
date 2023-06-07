import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import * as admin from 'firebase-admin';
import { Sidebar } from 'components/Sidebar';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../src/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Drafts } from 'components/Drafts';
type UserData = {
  title: string;
  url: string;
  document_id: string;
  status: string;
  category: string;
  wp_url: string;
  created_at: Date;
  updated_at: admin.firestore.Timestamp;
  due_date: Date;
  created_by?: admin.firestore.DocumentReference;
  name?: string;
};
type UserDataType = {
  name?: string;
};
const Draftslist: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        if (user) {
          const employeeDocRef = doc(db, 'users', user.uid);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;
          const allowedEmailsRef = collection(db, 'companies', ref, 'articles');
          const querySnapshot = await getDocs(allowedEmailsRef);

          const fetchedData: UserData[] = [];
          for (let doc of querySnapshot.docs) {
            const data = doc.data();
            const createdByRef = data.created_by;
            const createdByDocSnap = await getDoc(createdByRef);
            const createdByDocSnapData =
              createdByDocSnap.data() as UserDataType;
            fetchedData.push({
              ...(data as {
                title: string;
                url: string;
                document_id: string;
                status: string;
                category: string;
                wp_url: string;
                created_at: Date;
                updated_at: admin.firestore.Timestamp;
                due_date: Date;
              }),
              created_by: data.created_by,
              name: createdByDocSnapData.name,
            });
          }

          setData(fetchedData);
          console.log(fetchedData);
        } else {
          router.push('/');
        }
      } catch (error) {
        window.alert(error);
        console.log(error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserData();
    });

    return () => unsubscribe();
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
        <Drafts data={data} />
      </Box>
    </>
  );
};

export default Draftslist;
