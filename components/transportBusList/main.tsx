import { Center, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { get_bus_schedule_details_api } from "@public/commonData/Api"

import Filter from "@components/transportBusList/filter"

export default function TransportMain() {
  const [filteredTransports, setFilteredTransports] = useState([]);
  const [originalTransports, setOriginalTransports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(get_bus_schedule_details_api)
      .then((res) => res.data)
      .then((data) => {
        setFilteredTransports(data);
        setOriginalTransports(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    }, []);

  return (
    <Center>
      <Flex justifyContent={"space-around"} margin={"10"} direction={"column"}>
        <Filter setFilteredTransports={setFilteredTransports} originalTransports={originalTransports} loading={loading}/>
        
      </Flex>
    </Center>
  );
}
