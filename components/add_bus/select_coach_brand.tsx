import {
  Box,
  Button,
  Input,
  List,
  Text,
  Select,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { use, useState, useEffect } from "react";
import { coach, coachBrands } from "@public/common/bus_interfaces";
import { AiFillStar } from "react-icons/ai";

interface selectedCoachBrandsProps {
  coachList: coach[];
  coachBrandsList: coachBrands[];
  selectedCoach: coach;
  setSelectedCoach: (coach: coach) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  isBrandNew: boolean;
  setIsBrandNew: (isBrandNew: boolean) => void;
  setIsSelectingBrand: (isSelectingBrand: boolean) => void;
}

export default function SelectedCoachBrands({
  coachList,
  coachBrandsList,
  selectedCoach,
  setSelectedCoach,
  selectedBrand,
  setSelectedBrand,
  isBrandNew,
  setIsBrandNew,
  setIsSelectingBrand,
}: selectedCoachBrandsProps) {
  // generating brand names
  const [brandNames, setBrandNames] = useState<string[]>([]);
  const [filteredBrandNames, setFilteredBrandNames] = useState<string[]>([]);
  useEffect(() => {
    if (selectedCoach) {
      const tempBrandNames = [];
      coachBrandsList.forEach((brand) => {
        if (brand.coachId === selectedCoach.coachId) {
          tempBrandNames.push(...brand.brandList);
        }
      });
      setBrandNames(tempBrandNames);
    } else {
      setBrandNames([]);
    }
    console.log(selectedCoach);
    setSelectedBrand("");
  }, [selectedCoach]);

  // filtering brand names
  useEffect(() => {
    if (!selectedBrand) {
      setFilteredBrandNames(brandNames);
    } else {
      setFilteredBrandNames(
        brandNames.filter((brand) => brand.includes(selectedBrand)),
      );
    }
  }, [selectedBrand, brandNames]);

  // new brand or old brand
  useEffect(() => {
    if (selectedBrand && !brandNames.includes(selectedBrand.trim())) {
      setIsBrandNew(true);
    } else {
      setIsBrandNew(false);
    }
  }, [selectedBrand]);

  return (
    <>
      <Flex p={2} justifyContent={"space-around"}>
        {/* Selecting Coach */}
        <Select
          placeholder="Select Coach"
          onChange={(e) =>
            setSelectedCoach(
              coachList.find((coach) => coach.coachName === e.target.value),
            )
          }
          mr={2}
        >
          {coachList.map((coach) => (
            <option key={coach.coachId}>{coach.coachName}</option>
          ))}
        </Select>
        {/* Selecting Brand */}
        <InputGroup>
          <Input
            placeholder={"Select Brand"}
            onChange={(e) => setSelectedBrand(e.target.value)}
            value={selectedBrand || ""}
            isDisabled={!selectedCoach}
          />
          {isBrandNew && (
            <InputRightElement>
              <AiFillStar />
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>
      <Flex p={2} justifyContent={"flex-start"} align={"center"}>
        {(isBrandNew || !selectedBrand) && filteredBrandNames.length !== 0 && (
          <>
            <Text>Brand List:</Text>
            {filteredBrandNames.map((brand) => (
              <Button key={brand} onClick={() => setSelectedBrand(brand)} m={1}>
                {brand}
              </Button>
            ))}
          </>
        )}
      </Flex>
    </>
  );
}
