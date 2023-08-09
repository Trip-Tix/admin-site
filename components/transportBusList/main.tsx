import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { get_bus_schedule_details_api } from "@public/commonData/Api"

import Filter from "@components/transportBusList/filter"

export default function TransportMain() {
  const [transports, setTransports] = useState([]);
  const [originalTransports, setOriginalTransports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(get_bus_schedule_details_api)
      .then((res) => {
        setTransports(res.data);
        setOriginalTransports(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    }, []);

  return (
    <>
      <Flex justifyContent={"space-around"} margin={"10"}>
        <Filter expandedContent={<h1>Filer</h1>} />
      </Flex>
    </>
  );
}
