import { z } from "zod";

// Create schema for issue object
export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(256),
  description: z.string().min(1, "Description is required"),
});
