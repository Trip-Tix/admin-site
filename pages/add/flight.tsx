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
    <Layout title="Add Flight" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect transport={TransportType.Flight} navigation={NavigationOption.Add} />
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
