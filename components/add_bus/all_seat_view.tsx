import React from "react";
import { VStack, HStack, interactivity } from "@chakra-ui/react";
import Seat from "@components/add_bus/seat";

interface Props {
  row: number;
  column: number;
}

export function All_seat_view({ row, column } : Props) {
  return (
    <VStack spacing={1}>
      {Array.from(
        {
          length: row,
        },
        (_, index_row) => (
          <HStack key={index_row} spacing={1}>
            {Array.from(
              {
                length: column == 1 ? column : column + 1,
              },
              (_, index_column) => (
                <Seat
                  key={index_column}
                  i={index_row}
                  j={index_column}
                  row={row}
                  column={column}
                />
              ),
            )}
          </HStack>
        ),
      )}
    </VStack>
  );
}