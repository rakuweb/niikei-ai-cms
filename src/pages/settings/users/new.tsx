import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from 'src/firebase';

import { getAuth } from 'firebase/auth';
import { Role } from '@/features/account';
import { routes } from '@/constants/routes';

const Home: NextPage = () => {
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        if (user) {
          const employeeDocRef = doc(db, 'users', user.uid as string);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;

          const userRoleRef = doc(ref, 'employees', user.uid as string);
          const userRoleDoc = await getDoc(userRoleRef);
          const userRole = userRoleDoc.data()?.role;

          setRole(userRole);
        }
      } catch (error) {
        window.alert(error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (role === Role.Writer) router.push(routes.articlesNew);
  }, [role]);

  return (
    <>
      <Box>
        <Sidebar />
        <New />
      </Box>
    </>
  );
};

export default Home;
