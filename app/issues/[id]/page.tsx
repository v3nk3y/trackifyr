import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import SelectAssignee from "./SelectAssignee";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  //   get the issue details
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
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
          <SelectAssignee />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </div>
  );
};

export default IssueDetailPage;
