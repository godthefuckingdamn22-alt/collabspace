import prisma from "./prisma.js";

export async function addProjectMember(
  projectId: string,
  ownerId: string,
  email: string
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
  });

  if (!project) {
    throw new Error("Project not found or you are not the owner.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.id === ownerId) {
    throw new Error("You are already the project owner.");
  }

  const existingMember = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user.id,
      },
    },
  });

  if (existingMember) {
    throw new Error("User is already a project member.");
  }

  return prisma.projectMember.create({
    data: {
      projectId,
      userId: user.id,
      role: "member",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function removeProjectMember(
  projectId: string,
  ownerId: string,
  userId: string
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
  });

  if (!project) {
    throw new Error("Project not found or you are not the owner.");
  }

  if (userId === ownerId) {
    throw new Error("The project owner cannot be removed.");
  }

  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  if (!member) {
    throw new Error("Project member not found.");
  }

  return prisma.projectMember.delete({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });
}