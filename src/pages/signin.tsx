import { Box } from '@chakra-ui/react';
import { Login } from 'components/Login';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import type { NextPage } from 'next';
import { db } from 'src/firebase';

type SigninProps = {
  data: {
    email: string;
    password: string;
    name: string;
  };
};
const Signin: NextPage<SigninProps> = ({ data }) => {
  return (
    <>
      <Box w={`100vw`} h={`100vh`} bg={`#EAEAEA`}>
        <Login />
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  const allowedEmailsRef = collection(db, 'allowedEmails');
  const querySnapshot = await getDocs(allowedEmailsRef);

  const data = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    data.push(doc.data());
  });

  return {
    props: {
      data,
    },
  };
};

export default Signin;
