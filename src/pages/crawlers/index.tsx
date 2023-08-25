import { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Sites } from 'components/Sites';

import { fetchSites } from '@/firebase/firestore/sites';
import { selectCompanyItem, useCompanyStore } from '@/features/company';

const Draftslist: NextPage = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const company = useCompanyStore(selectCompanyItem);

  useEffect(() => {
    const fetchSitesData = async () => {
      if (!company?.uid) return;
      try {
        const fetchedData = await fetchSites(company.uid);
        setData(fetchedData);
      } catch (error) {
        window.alert(error);
        console.error(error);
      }
    };

    fetchSitesData();
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
        <Sites data={data} titles={'登録サイト一覧'} titles2={`サイト管理`} />
      </Box>
    </>
  );
};

export default Draftslist;
