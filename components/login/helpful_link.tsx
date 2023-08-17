import React from "react";
import { Stack, Link } from "@chakra-ui/react";
import { MdTextsms, MdOutlinePrivacyTip } from "react-icons/md";
import {
  foreground,
  lightForeground,
  background,
  accent1,
  accent2,
  darkBackground,
} from "@public/common/color";
export default function Helpful_link() {
  return (
    <Stack mt={4} direction="column" spacing={4}>
      <Stack direction="row" spacing={4}>
        <MdTextsms size={20} />

        <Link href="#" color={foreground}>
          Help Center
        </Link>
      </Stack>
      <Stack direction="row" spacing={4}>
        <MdOutlinePrivacyTip size={20} />

        <Link href="#" color={foreground}>
          Privacy Policy
        </Link>
      </Stack>
    </Stack>
  );
}
