import { Text } from "@chakra-ui/react";

interface NavItemProps {
  children: React.ReactNode;
}

export default function NavItem({ children }: NavItemProps) {
  return (
    <Text
      fontSize="md"
      fontWeight="medium"
      color="white"
      ml={6}
      cursor="pointer"
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Text>
  );
}
