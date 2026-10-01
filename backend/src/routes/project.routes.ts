import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectByIdController,
  getProjects,
  updateProjectController,
} from "../controllers/project.controller.js";
import {
  addProjectMemberController,
  removeProjectMemberController,
} from "../controllers/project-member.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getProjects);
router.post("/", requireAuth, createProjectController);

router.get("/:projectId", requireAuth, getProjectByIdController);

router.patch(
  "/:projectId",
  requireAuth,
  updateProjectController
);

router.delete(
  "/:projectId",
  requireAuth,
  deleteProjectController
);

router.post(
  "/:projectId/members",
  requireAuth,
  addProjectMemberController
);

router.delete(
  "/:projectId/members/:userId",
  requireAuth,
  removeProjectMemberController
);

export default router;