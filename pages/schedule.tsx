import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Spinner } from '@chakra-ui/react';

import { schedule_bus_url, schedule_train_url, schedule_flight_url } from '@public/common/pagelinks';

const SourcePage = () => {
  const router = useRouter();

  const [scheduleUrl, setScheduleUrl] = useState<string>('');

  useEffect(() => {
    const adminRole = sessionStorage.getItem('user-role');
    if (adminRole === 'ADMIN' || adminRole === 'BUS') {
      setScheduleUrl(schedule_bus_url);
    } else if (adminRole === 'TRAIN') {
      setScheduleUrl(schedule_train_url);
    } else if (adminRole === 'AIR') {
      setScheduleUrl(schedule_flight_url);
    }
    router.push(scheduleUrl);
  }, [router, scheduleUrl]);

  return (
    <Box textAlign="center" mt="20">
      <Heading size="lg">Redirecting to Schedule Page</Heading>
      <Spinner size="xl" mt="4" />
    </Box>
  );
};

export default SourcePage;