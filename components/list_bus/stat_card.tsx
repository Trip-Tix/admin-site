import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Center,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import DummyImage from "@public/images/stat_dummy.jpg";

export default function StatCard() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      width={{ base: "full", sm: "sm" }}
      pr={6}
      pl={6}
      pt={2}
      pb={2}
    >
      <Center pr={5}>
        <Image
          borderRadius="full"
          boxSize={"100px"}
          src={DummyImage.src}
          alt="Caffe Latte"
        />
      </Center>

      <Divider orientation="vertical" />

      <Stack>
        <CardBody>
          <Heading size="ms">Available Bus</Heading>
          <Heading size="md">10,000</Heading>
        </CardBody>
      </Stack>
    </Card>
  );
}
