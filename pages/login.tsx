import Link from "next/link";
import Image from "next/image"
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image as ImageChakra,
  Center,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdOutlinePrivacyTip, MdTextsms } from "react-icons/md";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";

import {
  foreground,
  lightForeground,
  background,
  accent1,
  accent2,
  darkBackground,
} from "@public/common/color";
import TripTixLogo from "@public/TripTixLogo.svg";
import image from "@public/images/LoginPageImage.jpg";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} background={background} color={foreground}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image
            src={TripTixLogo}
            alt="Triptix Logo"
            priority
            placeholder="empty"
            height={50}
          />
          <Heading fontSize={"4xl"} mb={"10"}>
            Triptix
          </Heading>
          <Heading fontSize={"2xl"}>Sign in</Heading>
          <FormControl id="username">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineUser color={darkBackground} />
              </InputLeftElement>
              <Input type="username" placeholder="Username" color={foreground}/>
            </InputGroup>
          </FormControl>
          <FormControl id="password">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineKey color={darkBackground} />
              </InputLeftElement>
              <Input type="password" placeholder="Password" color={foreground}/>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Text color={lightForeground}> Forgot Password ?</Text>
            <Button colorScheme={"teal"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
          <Stack mt={4} direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <MdTextsms size={20} />

              <Link href="#" color={foreground}>
                Help Center
              </Link>
            </Stack>
            <Stack direction="row" spacing={4}>
              <MdOutlinePrivacyTip size={20} />

              <Link href="#" color={foreground}>
                Privacy Policy
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}  >
        <ImageChakra
          alt={"Login Image"}
          objectFit={"cover"}
          src={image.src}
          boxShadow={"dark-lg"}
        />
      </Flex>
    </Stack>
  );
}
