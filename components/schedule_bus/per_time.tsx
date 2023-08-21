import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

interface PerTimeProps {
  index: number;
  time: { hour: number; minute: number };
  updateTimeEntry: (index: number, hour: number, minute: number) => void;
  removeTimeEntry: (index: number) => void;
}

export default function PerTime({
  index,
  time,
  updateTimeEntry,
  removeTimeEntry,
}: PerTimeProps) {
  const handleHourChange = (event) => {
    updateTimeEntry(index, Number(event.target.value), time.minute);
  };

  const handleMinuteChange = (event) => {
    updateTimeEntry(index, time.hour, Number(event.target.value));
  };

  const handleRemove = () => {
    removeTimeEntry(index);
  };

  return (
    <Box>
      <Text>
        Time: 
        <input type="number" value={time.hour} onChange={handleHourChange} />:
        <input type="number" value={time.minute} onChange={handleMinuteChange} />
      </Text>
      <Button onClick={handleRemove}>Remove</Button>
    </Box>
  );
}
