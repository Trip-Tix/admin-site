import { Divider, HStack, VStack, Flex } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState } from "react";
import { Day, SchedulingContext } from "@public/common/temporary_context";
import InitialForm from "@components/schedule_bus/initial_form";
import DetailsForm from "@components/schedule_bus/details_form";

export default function Main() {
  const [isInitialForm, setIsInitialForm] = useState(true);
  const [startingLocation, setStartingLocation] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [startingDate, setStartingDate] = useState<Day>({
    day: 0,
    month: 0,
    year: 0,
  });
  const [endingDate, setEndingDate] = useState<Day>({
    day: 0,
    month: 0,
    year: 0,
  });

  return (
    <Layout title="Schedule Bus" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Schedule}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Bus}
            navigation={NavigationOption.Schedule}
          />
          <SchedulingContext.Provider
            value={{
              startingLocation,
              setStartingLocation,
              destinations,
              setDestinations,
              startingDate,
              setStartingDate,
              endingDate,
              setEndingDate,
            }}
          >
            <Flex align="center" justify="space-between" direction="column" w="full">
              <InitialForm
                isInitialForm={isInitialForm}
                setIsInitialForm={setIsInitialForm}
              />
              <Divider />
              <DetailsForm isInitialForm={isInitialForm} />
            </Flex>
          </SchedulingContext.Provider>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
