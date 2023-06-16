import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
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
        console.log(error);
      }
    };

    fetchSitesData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <Box>
        <Sites data={data} titles={'登録サイト一覧'} />
      </Box>
    </>
  );
};

export default Draftslist;
