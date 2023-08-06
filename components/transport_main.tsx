import { Flex } from "@chakra-ui/react";
import TransportFilterBox from "./transport_filter_box";
import TransportTable from "./transport_table";

export default function TransportMain() {
    return (
        <>
            <Flex justifyContent={'space-around'} margin={'10'}>
                    <TransportFilterBox />
                    <TransportTable />
            </Flex>
        </>
    );
}