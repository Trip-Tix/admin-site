import {
  Box,
  HStack,
  VStack,
  Card,
  CardBody,
  Text,
  Stat,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import StatCard from "@components/list_bus/stat_card";
import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";

import Form from "@components/schedule_bus/form";

export default function Main() {
  return (
    <Layout title="Schedule Bus">
      <SidebarWithHeader navItem={NavigationOption.Schedule}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Bus}
            navigation={NavigationOption.Schedule}
          />
          <HStack spacing="4">
            <Form />
          </HStack>
          
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
