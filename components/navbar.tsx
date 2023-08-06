import { Flex, Box, Text, Image as ChakraImage } from "@chakra-ui/react";
import NavItem from "./nav_item";
import NavBarData from "../public/commonData/AdminNavBarData"; 

export interface NavbarProps {
  selected_option : string;
}
const color = "#1A202C";

export default function Navbar({ selected_option }: NavbarProps) {
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
        {NavBarData.map((item, index) => (
          <NavItem key={index}>{item}</NavItem>
        ))}
      </Flex>
    </Flex>
  );
}
