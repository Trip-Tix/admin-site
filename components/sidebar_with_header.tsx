"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiList,
  FiPlus,
  FiCalendar,
} from "react-icons/fi";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { IconType } from "react-icons";
import TripTixLogoLight from "@public/TripTixLogo.svg";
import TripTixLogoDark from "@public/TripTixLogoBlack.svg";
import { NavigationOption } from "@public/common/navigation_option";
import {
  home_url,
  add_url,
  list_url,
  schedule_url,
  logout_url,
} from "@public/common/pagelinks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  selected: boolean;
  link: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  selected: NavigationOption;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: home_url },
  { name: "List", icon: FiList, link: list_url },
  { name: "Add", icon: FiPlus, link: add_url },
  { name: "Schedule", icon: FiCalendar, link: schedule_url },
];

const SidebarContent = ({ onClose, selected, ...rest }: SidebarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Image
            src={colorMode == "light" ? TripTixLogoDark : TripTixLogoLight}
            alt="Triptix Logo"
            priority
            placeholder="empty"
            height={30}
          />
          <Text fontSize="2xl" fontWeight="bold">
            Triptix
          </Text>
        </HStack>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          selected={selected === link.name}
          link={link.link}
          m={4}
        >
          {link.name}
        </NavItem>
      ))}
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      ></Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, selected, link, ...rest }: NavItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(link);
  };
  const bgColor = useColorModeValue(
    selected ? "gray.200" : "transparent",
    selected ? "gray.700" : "transparent",
  );
  const hoverBgColor = useColorModeValue(
    selected ? "" : "gray.200",
    selected ? "" : "gray.700",
  );
  const color = useColorModeValue(
    selected ? "" : "black",
    selected ? "" : "white",
  );
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor={selected ? "default" : "pointer"}
        bg={bgColor} // Use the precalculated value
        onClick={selected ? () => {} : onClick}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [adminName, setAdminName] = useState<string>("");
  const [adminRole, setAdminRole] = useState<string>("");

  useEffect(() => {
    const adminInfo: any = sessionStorage.getItem("user-fullname");
    setAdminName(adminInfo);
    setAdminRole(sessionStorage.getItem("user-role"));
  }
  , []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack
        spacing={{ base: "5", md: "6" }}
        display={{ base: "flex", md: "none" }}
      >
        <Image
          src={colorMode == "light" ? TripTixLogoDark : TripTixLogoLight}
          alt="Triptix Logo"
          priority
          placeholder="empty"
          height={30}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Triptix
        </Text>
      </HStack>

      <HStack spacing={{ base: "5", md: "6" }}>
        <Button
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{adminName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {adminRole}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href={logout_url}>Sign out</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

interface SidebarWithHeaderProps {
  children: React.ReactNode;
  navItem: NavigationOption;
}

const SidebarWithHeader = ({ children, navItem }: SidebarWithHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        selected={navItem}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} selected={navItem} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
