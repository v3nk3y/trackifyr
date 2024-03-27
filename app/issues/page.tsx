import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesTable, { columnNames } from "./IssuesTable";
import IssuesToolbar from "./IssuesToolbar";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    direction: "asc" | "desc";
    page: string;
  };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const directionAcceptedValues = ["asc", "desc"];
  const direction = directionAcceptedValues.includes(searchParams.direction)
    ? searchParams.direction
    : "asc";

  const orderByAcceptedValues = columnNames;
  const orderBy = orderByAcceptedValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: direction }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    // No of records to skip
    skip: (page - 1) * pageSize,
    // No of records to fetch
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex gap="4" direction="column">
      <IssuesToolbar />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

//To force dynamic rendering - routes will be rendered for each user req at request time (fixing cache issue)
export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Trakifyr - Issues",
  description: "List of all project issues.",
};
