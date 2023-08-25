import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';

import { Sidebar } from 'components/Sidebar';
import { selectCompanyItem, useCompanyStore } from '@/features/company';
import { fetchArticlesWhere, Status } from '@/firebase/firestore/articles';
import { Checking } from '@/components/Checking';

const Draftslist: NextPage = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const company = useCompanyStore(selectCompanyItem);

  useEffect(() => {
    const fetchArticlesData = async () => {
      if (!company?.uid) return;

      try {
        const fetchedData = await fetchArticlesWhere(
          company.uid,
          Status.Checking
        );
        setData(fetchedData);
      } catch (error) {
        window.alert(error);
        console.error(error);
      }
    };

    fetchArticlesData();
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
        <Checking data={data} titles={'確認記事一覧'} />
      </Box>
    </>
  );
};

export default Draftslist;
