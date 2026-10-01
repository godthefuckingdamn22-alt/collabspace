import { apiRequest } from "./api";

export async function getProjects() {
  return apiRequest("/projects");
}

export async function createProject(
  name: string,
  description: string,
  color: string
) {
  return apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      color,
    }),
  });
}

export async function addProjectMember(
  projectId: string,
  email: string
) {
  return apiRequest(`/projects/${projectId}/members`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
}

export async function removeProjectMember(
  projectId: string,
  userId: string
) {
  return apiRequest(`/projects/${projectId}/members/${userId}`, {
    method: "DELETE",
  });
}