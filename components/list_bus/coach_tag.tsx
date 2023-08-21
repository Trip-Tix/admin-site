import { Tag } from "@chakra-ui/react";
import { getCoachNameBus } from "@public/common/api";
import axios from "axios";
import { useState, useEffect } from "react";

interface CoachTagProps {
  coachName: string;
}

export default function CoachTag({ coachName }: CoachTagProps) {
  const coachColorMap = {
    Luxury: "green",
    Standard: "blue",
    Premium: "purple",
    AC: "red",
    Seat: "orange",
    Sleeper: "gray",
  };

  return (
    <Tag size="md" variant="solid" colorScheme={coachColorMap[coachName]}>
      {coachName}
    </Tag>
  );
}
