import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
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
    <div>
      <div>{issue.id}</div>
      <div>{issue.title}</div>
      <div>{issue.status}</div>
      <div>{issue.description}</div>
      <div>{issue.createdAt.toDateString()}</div>
    </div>
  );
};

export default IssueDetailPage;
