import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Spinner } from '@chakra-ui/react';

import { list_bus_url, list_train_url, list_flight_url } from '@public/common/pagelinks';

const SourcePage = () => {
  const router = useRouter();
  
  const [listUrl, setListUrl] = useState<string>('');

  useEffect(() => {
    const adminRole = sessionStorage.getItem('user-role');
    if (adminRole === 'ADMIN' || adminRole === 'BUS') {
      setListUrl(list_bus_url);
    } else if (adminRole === 'TRAIN') {
      setListUrl(list_train_url);
    } else if (adminRole === 'AIR') {
      setListUrl(list_flight_url);
    }
    router.push(listUrl);
  }, [listUrl, router]);

  return (
    <Box textAlign="center" mt="20">
      <Heading size="lg">Redirecting to List Page</Heading>
      <Spinner size="xl" mt="4" />
    </Box>
  );
};

export default SourcePage;