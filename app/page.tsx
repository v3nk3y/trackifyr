import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Flex } from "@radix-ui/themes";
import IssueChart from "./IssueChart";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Flex direction="column" gap="4">
      <IssueSummary
        open={openIssues}
        inProgress={inProgressIssues}
        closed={closedIssues}
      />
      <LatestIssues />
      <IssueChart
        open={openIssues}
        inProgress={inProgressIssues}
        closed={closedIssues}
      />
    </Flex>
  );
}
