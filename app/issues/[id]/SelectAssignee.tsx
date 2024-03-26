"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        // Check if the user is unassigned then, send null since the db and api expects null for unassigned value
        assignedToUserId: userId === "Unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Oops spmething went wrong. Please try again later.");
      });
  };

  if (isLoading) return <Skeleton width="6rem" height="1.8rem" />;

  if (error) return null;

  return (
    <>
      <Select.Root
        size="2"
        defaultValue={issue.assignedToUserId || "Unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* For un assigning the user form the issue */}
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60secs
    retry: 3,
  });

export default SelectAssignee;
