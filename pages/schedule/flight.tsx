import { Divider, HStack, VStack, Flex } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState } from "react";
import { Day, AirSchedulingContext } from "@public/common/context";
import InitialForm from "@components/schedule_flight/initial_form";
import { locationInfo } from "@public/common/flight_interfaces";
import DetailsForm from "@components/schedule_flight/details_form";

export default function Main() {
  const [isInitialForm, setIsInitialForm] = useState(true);
  const [startingLocation, setStartingLocation] = useState<number>(0);
  const [destinationLocation, setDestinationLocation] = useState<number>(0);
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
    <Layout title="Schedule Flight" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Schedule}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Flight}
            navigation={NavigationOption.Schedule}
          />
          <AirSchedulingContext.Provider
            value={{
              startingLocation,
              setStartingLocation,
              destinationLocation,
              setDestinationLocation,
              startingDate,
              setStartingDate,
              endingDate,
              setEndingDate,
            }}
          >
            <Flex align="center" justify="space-between" direction="column" w="100%">
              <InitialForm
                isInitialForm={isInitialForm}
                setIsInitialForm={setIsInitialForm}
              />
              <Divider />
              <DetailsForm isInitialForm={isInitialForm} />
            </Flex>
          </AirSchedulingContext.Provider>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
