import { Box, Container, Heading } from '@chakra-ui/react';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <Box>
      <header>
        <Container maxW="container.lg" py={4} borderBottom="1px" borderColor="gray.200">
          <Heading as="h1" size="xl">
            {title}
          </Heading>
        </Container>
      </header>
      <main>
        <Container maxW="container.lg" py={8}>
          {children}
        </Container>
      </main>
    </Box>
  );
};

export default Layout;
