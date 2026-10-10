import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getProjectTasks,
  getTaskById,
  getTaskAuthorization,
  updateTask,
} from "../services/task.service.js";
import { getProjectById } from "../services/project.service.js";

const VALID_PRIORITIES = ["low", "medium", "high"];
const VALID_STATUSES = ["todo", "in-progress", "completed"];

export async function getProjectTasksController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const project = await getProjectById(projectId, req.userId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const tasks = await getProjectTasks(projectId);

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get project tasks.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}
export async function getTaskByIdController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const taskId = Array.isArray(req.params.taskId)
      ? req.params.taskId[0]
      : req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const authorization = await getTaskAuthorization(taskId);

    if (!authorization) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const isOwner =
      authorization.project.ownerId === req.userId;

    const isAssignee =
      authorization.assigneeId === req.userId;

    if (!isOwner && !isAssignee) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this task.",
      });
    }

    const task = await getTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get task.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}
export async function createTaskController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const project = await getProjectById(projectId, req.userId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    if (project.ownerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the project owner can create tasks.",
      });
    }

    const {
      title,
      description,
      assigneeId,
      dueDate,
      priority,
      status,
    } = req.body;

    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    if (
      description !== undefined &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Task description must be a string.",
      });
    }

    if (
      assigneeId !== undefined &&
      assigneeId !== null &&
      typeof assigneeId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignee ID.",
      });
    }

    let parsedDueDate: Date | null = null;

    if (
      dueDate !== undefined &&
      dueDate !== null &&
      dueDate !== ""
    ) {
      parsedDueDate = new Date(dueDate);

      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid due date.",
        });
      }
    }

    const taskPriority =
      typeof priority === "string" ? priority : "medium";

    if (!VALID_PRIORITIES.includes(taskPriority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task priority.",
      });
    }

    const taskStatus =
      typeof status === "string" ? status : "todo";

    if (!VALID_STATUSES.includes(taskStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status.",
      });
    }

    const task = await createTask(
      projectId,
      title,
      typeof description === "string" ? description : "",
      assigneeId ?? null,
      parsedDueDate,
      taskPriority,
      taskStatus
    );

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create task.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function updateTaskController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const taskId = Array.isArray(req.params.taskId)
      ? req.params.taskId[0]
      : req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const authorization = await getTaskAuthorization(taskId);

    if (!authorization) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const isOwner = authorization.project.ownerId === req.userId;
    const isAssignee = authorization.assigneeId === req.userId;

    if (!isOwner && !isAssignee) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this task.",
      });
    }

    const {
      title,
      description,
      assigneeId,
      dueDate,
      priority,
      status,
    } = req.body;

    // Regular members can only update the status of their own assigned task.
    if (!isOwner) {
      const memberOnlyFields =
        title !== undefined ||
        description !== undefined ||
        assigneeId !== undefined ||
        dueDate !== undefined ||
        priority !== undefined;

      if (memberOnlyFields) {
        return res.status(403).json({
          success: false,
          message: "Members can only update the status of their assigned tasks.",
        });
      }

      if (status === undefined) {
        return res.status(400).json({
          success: false,
          message: "Task status is required.",
        });
      }
    }

    if (
      title !== undefined &&
      (typeof title !== "string" || !title.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty.",
      });
    }

    if (
      description !== undefined &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Task description must be a string.",
      });
    }

    if (
      assigneeId !== undefined &&
      assigneeId !== null &&
      typeof assigneeId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignee ID.",
      });
    }

    let parsedDueDate: Date | null | undefined;

    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === "") {
        parsedDueDate = null;
      } else {
        parsedDueDate = new Date(dueDate);

        if (Number.isNaN(parsedDueDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid due date.",
          });
        }
      }
    }

    if (
      priority !== undefined &&
      (typeof priority !== "string" ||
        !VALID_PRIORITIES.includes(priority))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid task priority.",
      });
    }

    if (
      status !== undefined &&
      (typeof status !== "string" ||
        !VALID_STATUSES.includes(status))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status.",
      });
    }

    const task = await updateTask(taskId, {
      ...(title !== undefined && {
        title: title.trim(),
      }),
      ...(description !== undefined && {
        description: description.trim(),
      }),
      ...(assigneeId !== undefined && {
        assigneeId,
      }),
      ...(parsedDueDate !== undefined && {
        dueDate: parsedDueDate,
      }),
      ...(priority !== undefined && {
        priority,
      }),
      ...(status !== undefined && {
        status,
      }),
    });

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update task.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function deleteTaskController(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const taskId = Array.isArray(req.params.taskId)
      ? req.params.taskId[0]
      : req.params.taskId;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required.",
      });
    }

    const authorization = await getTaskAuthorization(taskId);

    if (!authorization) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    if (authorization.project.ownerId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Only the project owner can delete tasks.",
      });
    }

    const task = await deleteTask(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete task.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}