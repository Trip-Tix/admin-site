import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Spinner } from '@chakra-ui/react';

import { login_url } from '@public/common/pagelinks';

const SourcePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(login_url);
  }, []);

  return (
    <Box textAlign="center" mt="20">
      <Heading size="lg">Redirecting to Login Page</Heading>
      <Spinner size="xl" mt="4" />
    </Box>
  );
};

export default SourcePage;
