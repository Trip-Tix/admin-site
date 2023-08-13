import { Flex } from "@chakra-ui/react";
import Title from "@components/transportBusAddService/title";
import Form from "@components/transportBusAddService/form";
import NewCoaches from "@components/transportBusAddService/new_coaches";


export default function Main() {
    return (
        <Flex direction={"column"} margin={"10"}>
            <Title />
            <Form />
            <NewCoaches />
        </Flex>
    );
}
