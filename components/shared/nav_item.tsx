import { Text, Link } from "@chakra-ui/react";
import { background } from "@public/commonData/Colors";

interface NavItemProps {
  selected: boolean;
  url: string;
  text: string;
}

export default function NavItem({ selected, url, text }: NavItemProps) {
  return (
    <>
      {!selected && (
        <Link href={url} _hover={{ textDecoration: "none" }}>
          <Text
            color="gray.400"
            fontWeight="medium"
            fontSize="md"
            cursor="pointer"
            _hover={{ textShadow: "0px 0px 20px #FFFFFF" }}
            m={2}
          >
            {text}
          </Text>
        </Link>
      )}
      {selected && (
        <Text fontWeight="medium" fontSize="md" color={background} m={2}>
          {text}
        </Text>
      )}
    </>
  );
}
