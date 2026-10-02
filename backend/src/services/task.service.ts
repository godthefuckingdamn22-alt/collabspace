import prisma from "./prisma.js";

export async function getProjectTasks(projectId: string) {
  return prisma.task.findMany({
    where: {
      projectId,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getTaskById(taskId: string) {
  return prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      project: true,
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
export async function createTask(
  projectId: string,
  title: string,
  description: string,
  assigneeId: string | null,
  dueDate: Date | null,
  priority: string,
  status: string
) {
  return prisma.task.create({
    data: {
      projectId,
      title: title.trim(),
      description: description.trim(),
      assigneeId,
      dueDate,
      priority,
      status,
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
export async function updateTask(
  taskId: string,
  data: {
    title?: string;
    description?: string;
    assigneeId?: string | null;
    dueDate?: Date | null;
    priority?: string;
    status?: string;
  }
) {
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...(data.title !== undefined && {
        title: data.title.trim(),
      }),
      ...(data.description !== undefined && {
        description: data.description.trim(),
      }),
      ...(data.assigneeId !== undefined && {
        assigneeId: data.assigneeId,
      }),
      ...(data.dueDate !== undefined && {
        dueDate: data.dueDate,
      }),
      ...(data.priority !== undefined && {
        priority: data.priority,
      }),
      ...(data.status !== undefined && {
        status: data.status,
      }),
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
export async function deleteTask(taskId: string) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    return null;
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return task;
}
