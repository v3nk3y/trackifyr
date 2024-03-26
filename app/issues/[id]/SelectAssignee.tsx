"use client";
import { Select } from "@radix-ui/themes";

const SelectAssignee = () => {
  return (
    <Select.Root defaultValue="" size="2">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="v3nk3y">v3nk3y</Select.Item>
          <Select.Item value="venkatesh">Venkatesh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectAssignee;
