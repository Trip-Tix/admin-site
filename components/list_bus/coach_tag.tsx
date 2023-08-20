import { Tag } from "@chakra-ui/react";

interface CoachTagProps {
  coachType: string;
}

export default function CoachTag({ coachType }: CoachTagProps) {
  const coachColorMap = {
    Luxury: "green",
    Standard: "blue",
    Premium: "purple",
    AC: "red",
    Seat: "orange",
    Sleeper: "gray",
  };
  return (
    <Tag size="md" variant="solid" colorScheme={coachColorMap[coachType]}>
      {coachType}
    </Tag>
  );
}
