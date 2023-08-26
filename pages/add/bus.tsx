import {
  Button,
  VStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
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
import axios from "axios";

import { fetchCoachList, fetchCoachBrandList } from "@public/common/bus_api";

export default function Main() {
  // Coach Card Addition, Removal and Validation
  interface coachKeyItem {
    coachKey: string;
    isValid: boolean;
  }
  const [coachKeys, setCoachKeys] = useState<coachKeyItem[]>([]);
  const [newId, setNewId] = useState<number>(0);
  const addNewCoach = () => {
    setCoachKeys([...coachKeys, { coachKey: `Coach ${newId}`, isValid: true }]);
    setNewId(newId + 1);
  };
  const removeCoach = (key: string) => {
    setCoachKeys(coachKeys.filter((item) => item.coachKey !== key));
  };
  const validateCoach = (key: string, isValid: boolean) => {
    setCoachKeys(
      coachKeys.map((item) => {
        if (item.coachKey === key) {
          return { coachKey: key, isValid: isValid };
        } else {
          return item;
        }
      }),
    );
  };

  // Coach Cards need pre-fetched coach list
  const [coachList, setCoachList] = useState<coach[]>([]);
  const [coachListLoading, setCoachListLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setCoachListLoading(true);
      const coaches = await fetchCoachList();
      setCoachList(coaches);
      setCoachListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(coachList);
  }, [coachList]);

  // change this to api in future
  // Coach Cards need pre-fetched coach brands list
  const [coachBrandsList, setCoachBrandsList] = useState<coachBrands[]>([]);
  const [coachBrandsListLoading, setCoachBrandsListLoading] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setCoachBrandsListLoading(true);
      const coachBrands = await fetchCoachBrandList();
      setCoachBrandsList(coachBrands);
      setCoachBrandsListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(coachBrandsList);
  }, [coachBrandsList]);


  // Button for submitting
  const [submit, setSubmit] = useState<boolean>(false);

  return (
    <Layout title="Add Bus" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Bus}
            navigation={NavigationOption.Add}
          />
          {coachListLoading || coachBrandsListLoading ? (
            <Stack>
              <Skeleton height="10vh" />
              <Skeleton height="10vh" />
            </Stack>
          ) : (
            <VStack>
              {coachKeys.map((item) => (
                <CoachCard
                  key={item.coachKey}
                  removalAction={{
                    key: item.coachKey,
                    removeCoach: removeCoach,
                    validateCoach: validateCoach,
                  }}
                  coachList={coachList}
                  coachBrandsList={coachBrandsList}
                  submit={submit}
                />
              ))}
              <Button onClick={addNewCoach}> Add Coach </Button>
              <Button
                colorScheme="blue"
                onClick={() => setSubmit(true)}
                isDisabled={
                  coachKeys.length === 0 /* if no card */ ||
                  coachKeys.some((item) => !item.isValid) /* if some card has invalid values */
                }
              >
                {"Submit"}
              </Button>
            </VStack>
          )}
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
