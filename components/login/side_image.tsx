import React from "react";

import { Flex, Image} from "@chakra-ui/react";
import image from "@public/images/LoginPageImage.jpg";

export default function Side_image({}) {
  return (
    <Flex flex={1}>
      <Image
        alt={"Login Image"}
        objectFit={"cover"}
        src={image.src}
        boxShadow={"dark-lg"}
      />
    </Flex>
  );
}
