import { Flex, VStack } from "@chakra-ui/react";
import Title from "@components/transportBusAddService/title";
import Form from "@components/transportBusAddService/form";
import NewCoaches from "@components/transportBusAddService/new_coaches";


export default function Main() {
    return (
        <VStack spacing={"4"} align={"stretch"} margin={"5"}>
            <Title />
            <Form />
            <NewCoaches />
        </VStack>
    );
}
