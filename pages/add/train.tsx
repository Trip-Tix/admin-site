import {
  Button,
  VStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";

import { coach_interface } from "@public/common/train_interfaces";
import CoachCard from "@components/add_train/train_card";

export default function Main() {
  // Train Card Addition, Removal and Validation
  interface trainKeyItem {
    trainKey: string;
    isValid: boolean;
  }

  const [coachesLength, setCoachesLength] = useState<number>(0);
  const [facilitiesLength, setFacilitiesLength] = useState<number>(0);
  const [trainKeys, setTrainKeys] = useState<trainKeyItem[]>([]);
  const [newId, setNewId] = useState<number>(0);

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

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    const disabled = (
      trainKeys.length === 0 ||
      trainKeys.some((item) => !item.isValid) ||
      coachesLength === 0 ||
      facilitiesLength === 0
    );
    setIsSubmitDisabled(disabled);
  }, [trainKeys, coachesLength, facilitiesLength]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Layout title="Add Train" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Train}
            navigation={NavigationOption.Add}
          />
          <VStack>
            {trainKeys.map((item) => (
              <CoachCard
                key={item.trainKey}
                removalAction={{
                  key: item.trainKey,
                  removeTrain: removeTrain,
                  validateTrain: validateTrain,
                }}
                submit={submit}
                updateCoachesLength={setCoachesLength}
                updateFacilities={setFacilitiesLength}
                isLoading={isLoading}
                setLoading={setIsLoading}
              />
            ))}
            <Button onClick={addNewTrain}> Add Train </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsLoading(true); 
                setSubmit(true);
              }}
              isDisabled={isSubmitDisabled}
              isLoading={isLoading}
            >
              {"Submit"}
            </Button>
          </VStack>
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}