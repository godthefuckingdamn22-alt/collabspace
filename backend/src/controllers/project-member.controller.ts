import type { Request, Response } from "express";
import {
  addProjectMember,
  removeProjectMember,
} from "../services/project-member.service.js";

export async function addProjectMemberController(
  req: Request,
  res: Response
) {
  try {
    const ownerId = (req as Request & { userId?: string }).userId;
    const projectId = Array.isArray(req.params.projectId)
  ? req.params.projectId[0]
  : req.params.projectId;
    const { email } = req.body;

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

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "User email is required.",
      });
    }

    const member = await addProjectMember(
      projectId,
      ownerId,
      email
    );

    return res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to add project member.";

    if (message === "Project not found or you are not the owner.") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (
      message === "User not found." ||
      message === "You are already the project owner." ||
      message === "User is already a project member."
    ) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function removeProjectMemberController(
  req: Request,
  res: Response
) {
  try {
    const ownerId = (req as Request & { userId?: string }).userId;

    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;

    const userId = Array.isArray(req.params.userId)
      ? req.params.userId[0]
      : req.params.userId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!projectId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Project ID and user ID are required.",
      });
    }

    await removeProjectMember(projectId, ownerId, userId);

    return res.status(200).json({
      success: true,
      message: "Project member removed successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to remove project member.";

    if (message === "Project not found or you are not the owner.") {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (
      message === "The project owner cannot be removed." ||
      message === "Project member not found."
    ) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message,
    });
  }
}