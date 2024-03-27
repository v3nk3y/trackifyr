"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue="ALL"
      onValueChange={(status) => {
        // Empty params object
        const params = new URLSearchParams();
        // get orderBy params form url
        const orderByQueryParams = searchParams.get("orderBy");
        // if filter by status then appedn status value
        if (status) params.append("status", status);
        // if orderBy params exists then append those
        if (orderByQueryParams) params.append("orderBy", orderByQueryParams);

        // build finalparamvalue including ?
        const finalRouteUrlParam = params.size ? `?${params.toString()}` : "";
        router.push("/issues" + finalRouteUrlParam);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item
            key={status.value || "ALL"}
            value={status.value || "ALL"}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
