import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // route protection for API
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check if the assignedtoUSerId exist
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    // if exists then fetch the user
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    // If user not found
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // Get the issue
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  // if no issue found
  if (!issue) return NextResponse.json("Invalid Issue", { status: 404 });

  // Update the issue in the db
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // route protection for API
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });

  await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json({});
}
