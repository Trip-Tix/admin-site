import { VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";


import { FlightAddContext, ClassInfo } from "@public/common/context";
import { postAddFlight } from "@public/common/api";

export default function Main() {
  const [flightName, setFlightName] = useState("");
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [submit, setSubmit] = useState(false);
  const [check, setCheck] = useState(false);
  const [classKeys, setClassKeys] = useState<number[]>([]);

  useEffect (() => {
    if (check && flightName && classKeys.length > 0) {
      setSubmit(true);
    }
  }, [check]);

  return (
    <Layout title="Add Flight" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <FlightAddContext.Provider
            value={{
              flightName,
              setFlightName,
              classes,
              setClasses,
              submit,
              setSubmit,
              check,
              setCheck,
            }}
          >
            <TransportSelect
              transport={TransportType.Flight}
              navigation={NavigationOption.Add}
            />
          </FlightAddContext.Provider>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
