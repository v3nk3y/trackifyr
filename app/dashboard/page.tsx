import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "../IssueChart";
import IssueSummary from "../IssueSummary";
import LatestIssues from "../LatestIssues";

const DashboardPage = async () => {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="7">
      <Flex direction="column" gap="7">
        <IssueSummary
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
        <IssueChart
          open={openIssues}
          inProgress={inProgressIssues}
          closed={closedIssues}
        />
      </Flex>

      <LatestIssues />
    </Grid>
  );
};

export default DashboardPage;

export const metadata: Metadata = {
  title: "Trakifyr - Dashboard",
  description: "To view a summarized list of project issues for tracking.",
};
