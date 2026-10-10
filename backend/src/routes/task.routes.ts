import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getProjectTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/projects/:projectId/tasks",
  requireAuth,
  getProjectTasksController
);

router.post(
  "/projects/:projectId/tasks",
  requireAuth,
  createTaskController
);

router.get(
  "/tasks/:taskId",
  requireAuth,
  getTaskByIdController
);

router.patch(
  "/tasks/:taskId",
  requireAuth,
  updateTaskController
);

router.delete(
  "/tasks/:taskId",
  requireAuth,
  deleteTaskController
);

export default router;