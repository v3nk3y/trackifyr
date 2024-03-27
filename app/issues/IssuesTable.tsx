import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { TrakifyrLink, IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    direction: "asc" | "desc";
    page: string;
  };
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    direction:
                      column.value === searchParams.orderBy
                        ? searchParams.direction === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  },
                }}
              >
                {column.label}
                {column.value === searchParams.orderBy &&
                  (searchParams.direction === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Link>
            </Table.ColumnHeaderCell>
          ))}
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
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = ["title", "status", "createdAt"];

export default IssuesTable;
