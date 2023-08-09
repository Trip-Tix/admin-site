import {
  Flex,
  Box,
  Text,
  Image,
  Spacer,
  Avatar,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  color,
} from "@chakra-ui/react";
import { foreground, background, lightForeground } from "@public/commonData/Colors";
import NavItem from "@components/shared/nav_item";
import { navbar_item, profile_item } from "@public/commonData/AdminNavBarData";
import { useRouter } from "next/router";

interface NavbarProps {
  selected_option: string;
}

export default function Navbar({ selected_option }: NavbarProps) {
  const router = useRouter();
  function createRouterFunction(route) {
    return () => {
      router.push(route);
    };
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      p="4"
      boxShadow="md"
      background={foreground}
      color={"white"}
    >
      <Box>
        <Image
          src="/TripTixLogo.svg"
          alt="Company Logo"
          boxSize={"40px"}
          m={2}
        />
      </Box>
      <Text fontSize="lg" fontWeight="bold" textColor={"white"} mr="10">
        TripTix
      </Text>

      <Flex align="center">
        {navbar_item.map((item) => (
          <NavItem
            key={item[0]}
            text={item[0]}
            url={item[1]}
            selected={selected_option == item[0]}
          />
        ))}
      </Flex>

      <Spacer />
      <Text fontSize={"sm"} mr="2" style={{textShadow: "0px 0px 20px #FFFFFF"}}>
        John Doe
      </Text>
      <Menu>
        <MenuButton as={Flex} alignItems="center" mr="2" cursor={"pointer"}>
          <Avatar size="sm" name="John Doe" />
        </MenuButton>
        <MenuList>
          {profile_item.map((item) => (
            <MenuItem key={item[0]} onClick={createRouterFunction(item[1])} color={lightForeground}>
              {item[0]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
