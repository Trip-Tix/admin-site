import { Button, VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect, use } from "react";

import { coach, coachBrands } from "@public/common/bus_interfaces";
import CoachCard from "@components/add_bus/coach_card";

export default function Main() {
  const [coachKeys, setCoachKeys] = useState<string[]>([]);
  const [newId, setNewId] = useState<number>(0);
  const [submit, setSubmit] = useState<boolean>(false);

  const addNewCoach = () => {
    setCoachKeys([...coachKeys, `Coach ${newId}`]);
    setNewId(newId + 1);
  };
  const removeCoach = (key: string) => {
    setCoachKeys(coachKeys.filter((coachKey) => coachKey !== key));
  };

  //change this to api in future
  const [coachList, setCoachList] = useState<coach[]>([]);
  useEffect(() => {
    const tempCoachList: coach[] = [];
    for (let i = 0; i < 10; i++) {
      tempCoachList.push({
        coachId: i,
        coachName: `Coach ${i}`,
      });
    }

    setCoachList(tempCoachList);
  }, []);

  //change this to api in future
  const [coachBrandsList, setCoachBrandsList] = useState<coachBrands[]>([]);
  useEffect(() => {
    const tempCoachBrandsList: coachBrands[] = [];
    for (let i = 0; i < 10; i++) {
      const tempBrands: string[] = [];
      for (let j = 0; j < 10; j++) {
        tempBrands.push(`Brand${i}:${j}`);
      }
      tempCoachBrandsList.push({
        coachId: i,
        coachName: `Coach${i}`,
        brandList: tempBrands,
      });
    }

    setCoachBrandsList(tempCoachBrandsList);
  }, []);

  return (
    <Layout title="Add Bus" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Bus}
            navigation={NavigationOption.Add}
          />
          {coachKeys.map((key) => (
            <CoachCard
              key={key}
              coachKey={key}
              removeCoach={removeCoach}
              coachList={coachList}
              coachBrandsList={coachBrandsList}
              submit={submit}
            />
          ))}
          <Button onClick={addNewCoach}> Add Coach </Button>
          <Button colorScheme="blue" onClick={() => setSubmit(true)}>
            Submit{" "}
          </Button>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
