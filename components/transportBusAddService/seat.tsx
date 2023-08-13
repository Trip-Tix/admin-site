import { Box, Button } from "@chakra-ui/react";
import {
  background,
  darkerBackground,
  foreground,
  lightForeground,
} from "@public/commonData/Colors";
import { useEffect, useState } from "react";

interface Props {
  i: number;
  j: number;
  row: number;
  column: number;
}

export default function Seat({ i, j, row, column }: Props) {
  const [selected, SetSelected] = useState(false);

  useEffect(() => {
    SetSelected((column == 1) || (j * 2 == column) || (j * 2 == column - 1))
  }, [column, j])

  return (
    <Button
      w={"10"}
      h={"10"}
      bg={selected ? darkerBackground : lightForeground}
      rounded={"10"}
      shadow={"md"}
      onClick={() => {
        SetSelected(!selected);
      }}
    />
  );
}
