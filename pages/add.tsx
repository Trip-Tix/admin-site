import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Spinner } from '@chakra-ui/react';

import { add_bus_url, add_train_url, add_flight_url } from '@public/common/pagelinks';

const SourcePage = () => {
  const router = useRouter();

  const [addUrl, setAddUrl] = useState<string>('');

  useEffect(() => { 
    const adminRole = sessionStorage.getItem('user-role');
    if (adminRole === 'ADMIN' || adminRole === 'BUS') {
      setAddUrl(add_bus_url);
    } else if (adminRole === 'TRAIN') {
      setAddUrl(add_train_url);
    } else if (adminRole === 'AIR') {
      setAddUrl(add_flight_url);
    }

    router.push(addUrl);
  }, [addUrl, router]);

  return (
    <Box textAlign="center" mt="20">
      <Heading size="lg">Redirecting to Add Page</Heading>
      <Spinner size="xl" mt="4" />
    </Box>
  );
};

export default SourcePage;