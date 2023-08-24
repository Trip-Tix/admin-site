import {
  Box,
  Button,
  Input,
  List,
  Text,
  Select,
  VStack,
} from "@chakra-ui/react";
import { use, useState, useEffect } from "react";
import { coach, coachBrands } from "@public/common/bus_interfaces";

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

export default function selectedCoachBrands({
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
  const [brandNames, setBrandNames] = useState<string[]>([]);

  // generate brand names
  useEffect(() => {
    if (selectedCoach) {
      const selectedCoachBrands = coachBrandsList.find(
        (coachBrand) => coachBrand.coachId === selectedCoach.coachId,
      );
      if (selectedCoachBrands) {
        setBrandNames(selectedCoachBrands.brandList);
      }
    }
  }, [selectedCoach]);

  // if coach changes, reset brand names
  useEffect(() => {
    setFilteredBrandNames(brandNames);
  }, [brandNames]);

  // actual list data
  const [filteredBrandNames, setFilteredBrandNames] = useState<string[]>([]);
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
      <Select
        placeholder="Select Coach"
        onChange={(e) =>
          setSelectedCoach(
            coachList.find((coach) => coach.coachName === e.target.value),
          )
        }
      >
        {coachList.map((coach) => (
          <option key={coach.coachId}>{coach.coachName}</option>
        ))}
      </Select>

      <Input
        placeholder={"Select Brand"}
        onChange={(e) => setSelectedBrand(e.target.value)}
        value={selectedBrand || ""}
      />

      {isBrandNew && (
        <VStack spacing={3} align={"left"}>
          {filteredBrandNames.map((brand) => (
            <Button key={brand} onClick={() => setSelectedBrand(brand)}>
              {brand}
            </Button>
          ))}
        </VStack>
      )}

      <Button variant="outline" onClick={() => setIsSelectingBrand(true)}>
        Continue
      </Button>
    </>
  );
}
