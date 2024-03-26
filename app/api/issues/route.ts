import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Check for req body validation as per schema
  const validation = issueSchema.safeParse(body);
  // If validation is not success then return validation error
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // If success then create a record in db for the new issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  // return 201 success response and return the newly created issue
  return NextResponse.json(newIssue, { status: 201 });
}
