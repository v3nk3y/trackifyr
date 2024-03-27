import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import SelectAssignee from "./SelectAssignee";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  //   get the issue details
  const issue = await fetchUser(parseInt(params.id));
  //   If no issue found, redirect to not found page
  if (!issue) notFound();

  //   Display issue details
  return (
    <div className="max-w-xl">
      <Box className="mb-5">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="flex flex-col md:flex-row gap-4">
          <SelectAssignee issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </div>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}
