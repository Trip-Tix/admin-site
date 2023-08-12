import { Select } from "@chakra-ui/react";

interface Props {
    addAction: (item: string) => void;
    List: string[];
    Name: string;
}


export default function SelectOption({addAction, List, Name}: Props) {
  return (
    <Select onChange={(event) => addAction(event.target.value)} value="">
      <option value="" disabled>
        {Name}
      </option>
      {List.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </Select>
  );
}
