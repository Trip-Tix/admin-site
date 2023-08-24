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

interface CoachCardProps {
  coachKey: string;
  removeCoach: (key: string) => void;
  coachList: coach[];
  coachBrandsList: coachBrands[];
}

export default function CoachCard({
  coachKey,
  removeCoach,
  coachList,
  coachBrandsList,
}: CoachCardProps) {
  const [selectedCoach, setSelectedCoach] = useState<coach>();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [brandNames, setBrandNames] = useState<string[]>([]);
  const [isBrandNew, setIsBrandNew] = useState<boolean>(false);

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
    console.log(isBrandNew);
  }, [selectedBrand]);

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
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

        {filteredBrandNames.length > 0 && <VStack spacing={3}>
          {filteredBrandNames.map((brand) => (
            <Button key={brand} onClick={() => setSelectedBrand(brand)}>
              {brand}
            </Button>
          ))}
        </VStack>}

        <Button variant="outline" onClick={() => removeCoach(coachKey)}>
          Remove
        </Button>
      </Box>
    </>
  );
}
