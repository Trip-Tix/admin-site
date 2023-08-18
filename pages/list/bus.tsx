import { Box, HStack, VStack, Card, CardBody, Text, Stat } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import StatCard from "@components/list_bus/stat_card";
import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";
import TransportSelect from "@components/transport_select";
import { NavigationOption, TransportType } from "@public/common/navigation_option";

export default function Main() {
  return (
    <Layout title="List Bus">
      <SidebarWithHeader navItem={NavigationOption.List}>
        <VStack spacing="4" align="stretch">
        <TransportSelect transport={TransportType.Bus} navigation={NavigationOption.List} />
          <HStack spacing="4" align="stretch" justify="space-between" display={{ base: "none", md: "flex" }}>
            <StatCard />
            <StatCard />
            <StatCard />
            <StatCard />
          </HStack>
          <HStack spacing="4" align="stretch">
            <List />
            <Details/>
          </HStack>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
