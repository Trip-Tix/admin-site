import { HStack, Input, Text, VStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface LayoutCreationProps {
  row: number;
  setRow: (row: number) => void;
  col: number;
  setCol: (col: number) => void;
  layout: number[][];
  setLayout: (layout: number[][]) => void;
  numSeat: number;
  setNumSeat: (numSeat: number) => void;
}

export default function LayoutCreation({
  row,
  setRow,
  col,
  setCol,
  layout,
  setLayout,
  numSeat,
  setNumSeat,
}: LayoutCreationProps) {
  const [rowArray, setRowArray] = useState<number[]>([]);
  const [colArray, setColArray] = useState<number[]>([]);
  useEffect(() => {
    const tempRowArray: number[] = [];
    for (let i = 0; i < row; i++) {
      tempRowArray.push(i);
    }
    setRowArray(tempRowArray);
  }, [row]);
  
  useEffect(() => {
    const tempColArray: number[] = [];
    for (let i = 0; i < col; i++) {
      tempColArray.push(i);
    }
    setColArray(tempColArray);
  }, [col]);

  useEffect(() => {
    const tempLayout: number[][] = [];
    for (let i = 0; i < row; i++) {
      const tempRow: number[] = [];
      for (let j = 0; j < col; j++) {
        tempRow.push(0);
      }
      tempLayout.push(tempRow);
    }
    setLayout(tempLayout);
  }, [row, col]);

  useEffect(() => {
    let tempNumSeat = 0;
    layout.forEach((row) => {
      row.forEach((seat) => {
        if (seat === 1) {
          tempNumSeat++;
        }
      });
    });
    setNumSeat(tempNumSeat);
  }, [layout]);

  return (
    <>
      <VStack>
        <HStack>
          <Text>Row</Text>
          <Input
            type="number"
            value={row}
            onChange={(e) => setRow(parseInt(e.target.value))}
          />
        </HStack>
        <HStack>
          <Text>Column</Text>
          <Input
            type="number"
            value={col}
            onChange={(e) => setCol(parseInt(e.target.value))}
          />
        </HStack>
        <VStack>
          {rowArray.map((row) => (
            <HStack key={row}>
              {colArray.map((col) => (
                <Button
                  key={col}
                  value={layout[row][col]}
                  bg={layout[row][col] === 0 ? "red" : "green"}
                  onClick={() => {
                    const tempLayout = JSON.parse(JSON.stringify(layout)); //deep copy
                    tempLayout[row][col] = tempLayout[row][col] === 0 ? 1 : 0;
                    setLayout(tempLayout);
                  }}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </VStack>
    </>
  );
}
