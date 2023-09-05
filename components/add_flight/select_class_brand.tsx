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
import { class_interface, classBrands } from "@public/common/flight_interfaces";
import { AiFillStar } from "react-icons/ai";

interface selectedClassBrandsProps {
  classList: class_interface[];
  classBrandsList: classBrands[];
  selectedClass: class_interface;
  setSelectedClass: (class_: class_interface) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  isBrandNew: boolean;
  setIsBrandNew: (isBrandNew: boolean) => void;
  setIsSelectingBrand: (isSelectingBrand: boolean) => void;
}

export default function SelectedClassBrands({
  classList,
  classBrandsList,
  selectedClass,
  setSelectedClass,
  selectedBrand,
  setSelectedBrand,
  isBrandNew,
  setIsBrandNew,
  setIsSelectingBrand,
}: selectedClassBrandsProps) {
  // generating brand names
  const [brandNames, setBrandNames] = useState<string[]>([]);
  const [filteredBrandNames, setFilteredBrandNames] = useState<string[]>([]);
  useEffect(() => {
    if (selectedClass) {
      const tempBrandNames = [];
      classBrandsList.forEach((brand) => {
        if (brand.classId === selectedClass.classId) {
          tempBrandNames.push(...brand.brandList);
        }
      });
      setBrandNames(tempBrandNames);
    } else {
      setBrandNames([]);
    }
    console.log(selectedClass);
    setSelectedBrand("");
  }, [selectedClass]);

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
        {/* Selecting Class */}
        <Select
          placeholder="Select Class"
          onChange={(e) =>
            setSelectedClass(
              classList.find((class_) => class_.className === e.target.value),
            )
          }
          mr={2}
        >
          {classList.map((class_) => (
            <option key={class_.classId}>{class_.className}</option>
          ))}
        </Select>
        {/* Selecting Brand */}
        <InputGroup>
          <Input
            placeholder={"Select Brand"}
            onChange={(e) => setSelectedBrand(e.target.value)}
            value={selectedBrand || ""}
            isDisabled={!selectedClass}
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
