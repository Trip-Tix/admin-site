import { Flex, Box, Text, Image as ChakraImage } from "@chakra-ui/react";
import NavItem from "./nav_item";

interface NavbarProps {
  color: string;
}

export default function Navbar({ color }: NavbarProps) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      backgroundColor={color}
    >
      <Box display="flex" alignItems="center">
        {/* Logo */}
        <ChakraImage src="/TripTixLogo.svg" alt="Company Logo" boxSize="40px" mr={2} />
        {/* Website Name */}
        <Text fontSize="lg" fontWeight="bold">
          <span style={{ color: "#ffffff" }}>TripTix</span>
        </Text>
      </Box>
      <Flex>
        {/* Navbar Options */}
        <NavItem>Dashboard</NavItem>
        <NavItem>Manage Transports</NavItem>
        <NavItem>Manage Users</NavItem>
        <NavItem>Settings</NavItem>
        <NavItem>Profile</NavItem>
      </Flex>
    </Flex>
  );
}
