import { VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";

import Title from "@components/add_bus/title";
import NameForm from "@components/add_bus/name_form";
import NewCoaches from "@components/add_bus/new_coaches";
import SubmitButton from "@components/add_bus/submit_button";

import { BusAddContext, CoachInfo } from "@public/common/context";
import { postAddBus } from "@public/common/api";

export default function Main() {
  const [busName, setBusName] = useState("");
  const [coaches, setCoaches] = useState<CoachInfo[]>([]);
  const [submit, setSubmit] = useState(false);
  const [check, setCheck] = useState(false);
  const [coachKeys, setCoachKeys] = useState<number[]>([]);

  useEffect (() => {
    if (check && busName && coachKeys.length > 0) {
      setSubmit(true);
    }
  }, [check]);

  return (
    <Layout title="Add Bus" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <BusAddContext.Provider
            value={{
              busName,
              setBusName,
              coaches,
              setCoaches,
              submit,
              setSubmit,
              check,
              setCheck,
            }}
          >
            <TransportSelect
              transport={TransportType.Bus}
              navigation={NavigationOption.Add}
            />
            <Title />
            <NameForm />
            <NewCoaches coachKeys={coachKeys} setCoachKeys={setCoachKeys}/>
            <SubmitButton coachKeys={coachKeys}/>
          </BusAddContext.Provider>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
