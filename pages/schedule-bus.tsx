import { Box, HStack, VStack, Card, CardBody, Text, Stat } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import StatCard from "@components/list_bus/stat_card";
import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";

export default function Main() {
  return (
    <Layout title="List">
      <SidebarWithHeader>
        <VStack spacing="4" align="stretch">
            <p>Schedule</p>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
