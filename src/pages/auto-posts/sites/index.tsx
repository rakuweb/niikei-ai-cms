import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';

import { Sidebar } from 'components/Sidebar';
import { fetchSites } from '@/firebase/firestore/sites';
import { selectCompanyItem, useCompanyStore } from '@/features/company';
import { Sites } from 'components/Sites';

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
    // eslint-disable-next-line
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <Box>
        <Sites data={data} titles={'登録サイト一覧'} titles2={'自動投稿管理'} />
      </Box>
    </>
  );
};

export default Draftslist;
