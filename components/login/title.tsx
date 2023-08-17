import React from "react";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import TripTixLogo from "@public/TripTixLogo.svg";
export default function Title() {
  return (
    <>
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
    </>
  );
}
