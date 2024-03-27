import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
interface Statuses {
  label: string;
  value: number;
  status: Status;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statusesContainers: Statuses[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statusesContainers.map((statusContainer) => (
        <Card key={statusContainer.label}>
          <Flex direction="column" gap="2">
            <Link
              href={`/issues?status=${statusContainer.status}`}
              className="text-sm font-medium"
            >
              {statusContainer.label}
            </Link>
            <Text size="5" className="font-bold">
              {statusContainer.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
