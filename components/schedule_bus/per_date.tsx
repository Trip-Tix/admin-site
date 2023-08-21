import { Day, SchedulingContext } from "@public/common/temporary_context";
import React, { useState } from 'react';
import { Box, Text, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import PerTime from "@components/schedule_bus/per_time"

interface PerDateProps {
  currentDate: Day;
}



export default function PerDate({ currentDate }: PerDateProps) {
    const [timeEntries, setTimeEntries] = useState([]);
  
    const addTimeEntry = () => {
      setTimeEntries([...timeEntries, { hour: 0, minute: 0 }]);
    };
  
    const removeTimeEntry = (index) => {
      const updatedEntries = timeEntries.filter((_, i) => i !== index);
      setTimeEntries(updatedEntries);
    };
  
    const updateTimeEntry = (index, hour, minute) => {
      const updatedEntries = [...timeEntries];
      updatedEntries[index] = { hour, minute };
      setTimeEntries(updatedEntries);
    };
  
    return (
      <Flex  justify="space-between" direction="row" w="full">
        <Text mt={4}>
          Date: {currentDate.day}/{currentDate.month}/{currentDate.year}
        </Text>
        <VStack spacing={4}>
        {timeEntries.map((time, index) => (
          <PerTime
            key={index}
            index={index}
            time={time}
            updateTimeEntry={updateTimeEntry}
            removeTimeEntry={removeTimeEntry}
            date={currentDate}
          />
        ))}
        </VStack>
        <Button onClick={addTimeEntry} m={2}>Add Time Entry</Button>
      </Flex>
    );
  }