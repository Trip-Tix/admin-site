import React, { useEffect, useState } from "react";
import { Center, Image } from "@chakra-ui/react";
import SideImage from "@public/images/LoginPageImage.jpg";

export default function Main() {
  const breakpointWidth = 768; // For example, adjust as needed

  const [isViewportWide, setIsViewportWide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsViewportWide(window.innerWidth >= breakpointWidth);
    };

    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isViewportWide && (
        <Center width={"50vw"} height={"100vh"} background={"Black"}>
          <Image
            src={SideImage.src}
            alt="Picture of triptix"
            height={"100vh"}
            objectFit={"cover"}
            objectPosition={"center"}
          />
        </Center>
      )}
    </>
  );
}
