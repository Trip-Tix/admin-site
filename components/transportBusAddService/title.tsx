import { Heading } from "@chakra-ui/react";

export default function Title() {
    return(
        <>
        <Heading as={"h1"} size={"lg"} pb={"4"}>Add New Bus</Heading>
        <Heading as={"h4"} size={"sm"} pb={"4"}>{"Please note that all added buses must meet safety and regulatory standards. Any changes or modifications to your fleet should be accurately updated through our platform. By adding buses, you agree to comply with our terms and conditions, ensuring a secure and reliable travel experience for all passengers. We reserve the right to review and approve all additions for consistency with our service quality."}</Heading>
        </>
    );
}