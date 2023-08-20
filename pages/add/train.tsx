import { VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";


export default function Main() {
  const [trainName, setTrainName] = useState("");
  const [coaches, setCoaches] = useState<CoachInfo[]>([]);
  const [submit, setSubmit] = useState(false);
  const [check, setCheck] = useState(false);
  const [coachKeys, setCoachKeys] = useState<number[]>([]);

  useEffect (() => {
    if (check && trainName && coachKeys.length > 0) {
      setSubmit(true);
    }
  }, [check]);

  return (
    <Layout title="Add Train" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
            <TransportSelect
              transport={TransportType.Train}
              navigation={NavigationOption.Add}
            />
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
