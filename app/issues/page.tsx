import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, TrakifyrLink } from "@/app/components";
import IssuesToolbar from "./IssuesToolbar";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <TrakifyrLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </TrakifyrLink>
                <div className="block md:hidden mt-1">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

//To force dynamic rendering - routes will be rendered for each user req at request time (fixing cache issue)
export const dynamic = "force-dynamic";

export default IssuesPage;
