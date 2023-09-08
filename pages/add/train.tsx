import { Button, Skeleton, Stack, VStack } from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";
import { TrainAddContext, CoachInfo } from "@public/common/context";
import { postAddTrain } from "@public/common/api";
import { coach } from "@public/common/train_interfaces";
import { fetchCoachList } from "@public/common/train_api";
import CoachCard from "@components/add_train/train_card";

export default function Main() {
  interface trainKeyItem {
    trainKey: string;
    isValid: boolean;
  }

  const [coachLength, setCoachLength] = useState<number>(0);
  const [facilitiesLength, setFacilitiesLength] = useState<number>(0);
  const [trainKeys, setTrainKeys] = useState<trainKeyItem[]>([]);
  const [newId, setNewId] = useState<number>(0);

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

  const addNewTrain = () => {
    setTrainKeys([...trainKeys, { trainKey: `Train ${newId}`, isValid: true }]);
    setNewId(newId + 1);
  };

  const removeTrain = (key: string) => {
    setTrainKeys(trainKeys.filter((item) => item.trainKey !== key));
  };

  const validateTrain = (key: string, isValid: boolean) => {
    setTrainKeys(
      trainKeys.map((item) => {
        if (item.trainKey === key) {
          return { trainKey: key, isValid: isValid };
        } else {
          return item;
        }
      }),
    );
  };

  // Button for submitting
  const [submit, setSubmit] = useState<boolean>(false);
  return (
    <Layout title="Add Train" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Bus}
            navigation={NavigationOption.Add}
          />
          {coachListLoading ? (
            <Stack>
              <Skeleton height="10vh" />
              <Skeleton height="10vh" />
            </Stack>
          ) : (
            <VStack>
              {trainKeys.map((item) => (
                <CoachCard
                  key={item.trainKey}
                  removalAction={{
                    key: item.trainKey,
                    removeTrain: removeTrain,
                    validateTrain: validateTrain,
                  }}
                  updateCoachLength={setCoachLength}
                  updateFacilities={setFacilitiesLength}
                  submit={submit}
                />
              ))}
              <Button onClick={addNewTrain}> Add Coach </Button>
              <Button
                colorScheme="blue"
                onClick={() => setSubmit(true)}
                isDisabled={
                  trainKeys.length === 0 /* if no card */ ||
                  trainKeys.some(
                    (item) => !item.isValid,
                  ) /* if some card has invalid values */ ||
                  coachLength === 0 ||
                  facilitiesLength === 0
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
