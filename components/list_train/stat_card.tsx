import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Center,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useContext } from "react";
import DummyImage from "@public/images/stat_dummy.jpg";
import axios from "axios";

interface StatCardProps {
  cardTitle: string;
  apiLink: string;
  cardImage: string
}

export default function StatCard({ cardTitle, apiLink, cardImage }: StatCardProps) {
  const [data, setData] = React.useState<number>(0);
  const [userToken, setUserToken] = React.useState<string>("");
  
  useEffect(() => {
    async function fetchData() {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try{
        const response = await axios.post(apiLink, null, {
          headers: {
            'usertoken': userToken,
          },
        });

        if (response.status === 200) {
          setData(response.data);
        } else {
          console.error(response.data, "component/stat_card.tsx");
        }
      }
      catch(error){
        console.error(error, "component/stat_card.tsx");
      }
    }
    fetchData();
  }, [userToken]);


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
      boxShadow="md"
    >
      <Center pr={5}>
        <Image
          borderRadius="full"
          boxSize={"100px"}
          src={cardImage}
          alt="Caffe Latte"
        />
      </Center>

      <Divider orientation="vertical" />

      <Stack>
        <CardBody>
          <Heading size="ms">{cardTitle}</Heading>
          <Heading size="md">{data}</Heading>
        </CardBody>
      </Stack>
    </Card>
  );
}
