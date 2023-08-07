import { Flex } from "@chakra-ui/react";
import TransportFilterBox from "./transport_filter_box";
import TransportTable from "./transport_table";
import { useState, useEffect } from "react";
import { get_bus_info_url } from "@public/commonData/Api";

export default function TransportMain() {
  const [transports, setTransports] = useState([]);
  const [originalTransports, setOriginalTransports] = useState([]);

  useEffect(() => {
    fetch(get_bus_info_url)
      .then((response) => response.json())
      .then((data) => {
        setTransports(data);
        setOriginalTransports(data);
        console.log(data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Flex justifyContent={"space-around"} margin={"10"}>
        <TransportFilterBox
          transports={transports}
          setTransports={setTransports}
          originalTransports={originalTransports}
        />
        <TransportTable transports={transports} />
      </Flex>
    </>
  );
}
