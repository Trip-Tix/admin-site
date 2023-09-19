import React from 'react';
import { Select } from "@chakra-ui/react";
import { class_interface } from "@public/common/flight_interfaces";

interface ClassSelectorProps {
    classList: class_interface[];
    onClassChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedClass: class_interface | null;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ classList, onClassChange, selectedClass }) => {
  return (
    <Select
      placeholder="Select Class"
      value={selectedClass?.classId || ""}
      onChange={onClassChange}
      w={"100%"}
    >
      {classList.filter(cls => cls.classId !== selectedClass?.classId).map((cls) => (
        <option key={cls.classId} value={cls.classId}>
          {cls.className}
        </option>
      ))}
    </Select>
  );
}

export default ClassSelector;
