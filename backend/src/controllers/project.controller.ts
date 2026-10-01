import type { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getUserProjects,
  updateProject,
} from "../services/project.service.js";


export async function getProjects(req: Request, res: Response) {
  try {
    const userId = (req as Request & { userId?: string }).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const projects = await getUserProjects(userId);

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get projects.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function createProjectController(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as Request & { userId?: string }).userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { name, description, color } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }

    const project = await createProject(
      userId,
      name,
      typeof description === "string" ? description : "",
      typeof color === "string" ? color : "indigo"
    );

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create project.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function getProjectByIdController(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as Request & { userId?: string }).userId;

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const project = await getProjectById(projectId, userId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to get project.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function updateProjectController(
  req: Request,
  res: Response
) {
  try {
    const ownerId = (req as Request & { userId?: string }).userId;

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const { name, description, color, dueDate } = req.body;

    if (
      name !== undefined &&
      (typeof name !== "string" || !name.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Project name cannot be empty.",
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

    const project = await updateProject(projectId, ownerId, {
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined &&
        typeof description === "string" && {
          description: description.trim(),
        }),
      ...(color !== undefined &&
        typeof color === "string" && {
          color,
        }),
      ...(parsedDueDate !== undefined && {
        dueDate: parsedDueDate,
      }),
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you are not the owner.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update project.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function deleteProjectController(
  req: Request,
  res: Response
) {
  try {
    const ownerId = (req as Request & { userId?: string }).userId;

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required.",
      });
    }

    const project = await deleteProject(projectId, ownerId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you are not the owner.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete project.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}