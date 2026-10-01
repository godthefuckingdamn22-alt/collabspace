import prisma from "./prisma.js";

export async function getUserProjects(userId: string) {
  return prisma.project.findMany({
    where: {
      OR: [
        {
          ownerId: userId,
        },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createProject(
  userId: string,
  name: string,
  description: string,
  color: string
) {
  const project = await prisma.project.create({
    data: {
      name: name.trim(),
      description: description.trim(),
      color,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "owner",
        },
      },
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return project;
}

export async function getProjectById(
  projectId: string,
  userId: string
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      tasks: true,
    },
  });
}

export async function updateProject(
  projectId: string,
  ownerId: string,
  data: {
    name?: string;
    description?: string;
    color?: string;
    dueDate?: Date | null;
  }
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
  });

  if (!project) {
    return null;
  }

  return prisma.project.update({
    where: {
      id: projectId,
    },
    data,
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

export async function deleteProject(
  projectId: string,
  ownerId: string
) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      ownerId,
    },
  });

  if (!project) {
    return null;
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  return project;
}