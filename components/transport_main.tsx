import { Flex } from "@chakra-ui/react";
import TransportFilterBox from "./transport_filter_box";
import TransportTable from "./transport_table";
import { useState, useEffect } from "react";
import { get_schedule_wise_bus_details_url } from "@public/commonData/LocalAPI";

export default function TransportMain() {
  const [transports, setTransports] = useState([]);
  const [originalTransports, setOriginalTransports] = useState([]);

  useEffect(() => {
    fetch(get_schedule_wise_bus_details_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setTransports(data);
        setOriginalTransports(data); // Log the fetched data
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
