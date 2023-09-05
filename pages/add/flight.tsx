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

import { classBrands, class_interface } from "@public/common/flight_interfaces";
import ClassCard from "@components/add_flight/class_card";
import axios from "axios";

import { fetchClassList, fetchClassBrandList } from "@public/common/flight_api";

export default function Main() {
  // Class Card Addition, Removal and Validation
  interface classKeyItem {
    classKey: string;
    isValid: boolean;
  }
  const [classKeys, setClassKeys] = useState<classKeyItem[]>([]);
  const [newId, setNewId] = useState<number>(0);
  const addNewClass = () => {
    setClassKeys([...classKeys, { classKey: `Class ${newId}`, isValid: true }]);
    setNewId(newId + 1);
  };
  const removeClass = (key: string) => {
    setClassKeys(classKeys.filter((item) => item.classKey !== key));
  };
  const validateClass = (key: string, isValid: boolean) => {
    setClassKeys(
      classKeys.map((item) => {
        if (item.classKey === key) {
          return { classKey: key, isValid: isValid };
        } else {
          return item;
        }
      }),
    );
  };

  // Class Cards need pre-fetched class list
  const [classList, setClassList] = useState<class_interface[]>([]);
  const [classListLoading, setClassListLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setClassListLoading(true);
      const classes = await fetchClassList();
      setClassList(classes);
      setClassListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(classList);
  }, [classList]);

  // change this to api in future
  // Class Cards need pre-fetched class brands list
  const [classBrandsList, setClassBrandsList] = useState<classBrands[]>([]);
  const [classBrandsListLoading, setClassBrandsListLoading] =
    useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setClassBrandsListLoading(true);
      const classBrands = await fetchClassBrandList();
      setClassBrandsList(classBrands);
      setClassBrandsListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(classBrandsList);
  }, [classBrandsList]);


  // Button for submitting
  const [submit, setSubmit] = useState<boolean>(false);

  return (
    <Layout title="Add Flight" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Flight}
            navigation={NavigationOption.Add}
          />
          {classListLoading || classBrandsListLoading ? (
            <Stack>
              <Skeleton height="10vh" />
              <Skeleton height="10vh" />
            </Stack>
          ) : (
            <VStack>
              {classKeys.map((item) => (
                <ClassCard
                  key={item.classKey}
                  removalAction={{
                    key: item.classKey,
                    removeClass: removeClass,
                    validateClass: validateClass,
                  }}
                  classList={classList}
                  classBrandsList={classBrandsList}
                  submit={submit}
                />
              ))}
              <Button onClick={addNewClass}> Add Class </Button>
              <Button
                colorScheme="blue"
                onClick={() => setSubmit(true)}
                isDisabled={
                  classKeys.length === 0 /* if no card */ ||
                  classKeys.some((item) => !item.isValid) /* if some card has invalid values */
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
