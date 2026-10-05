import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { apiRequest } from "../services/api";
import { AuthContext } from "./auth-context";

type MemberRole = "owner" | "member";

export type Member = {
  id: string;
  name: string;
  initials: string;
  role: MemberRole;
};

export type TaskStatus = "todo" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  assigneeId: string | null;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export type ProjectColor = "indigo" | "blue" | "green" | "red";

export type Project = {
  id: string;
  name: string;
  description: string;
  color: ProjectColor;
  ownerId: string;
  due: string;
  members: Member[];
  tasks: Task[];
};

type BackendProjectMember = {
  id: string;
  projectId: string;
  userId: string;
  role: string;
  joinedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type BackendProject = {
  id: string;
  name: string;
  description: string;
  color: string;
  ownerId: string;
  members: BackendProjectMember[];
};

type ProjectContextType = {
  currentUser: {
    id: string;
    name: string;
    initials: string;
  } | null;
  projects: Project[];

  createProject: (
    name: string,
    description: string,
    color: ProjectColor
  ) => void;
  addMember: (projectId: string, email: string) => void;
  removeMember: (projectId: string, memberId: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id">) => void;
  updateTask: (
  projectId: string,
  taskId: string,
  updates: Omit<Task, "id">
) => void;
  updateTaskStatus: (
    projectId: string,
    taskId: string,
    status: TaskStatus
  ) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  getProjectProgress: (project: Project) => number;
  canManageProject: (project: Project) => boolean;
  canAccessProject: (project: Project) => boolean;
  canUpdateTask: (project: Project, task: Task) => boolean;
};

const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export function ProjectProvider({ children }: { children: ReactNode }) {
const auth = useContext(AuthContext);
const user = auth?.user ?? null;

const currentUser = user
  ? {
      id: user.id,
      name: user.name,
      initials: user.name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    }
  : null;

const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
  async function loadProjects() {
    try {
      const data = await apiRequest("/projects");

      const projectsWithTasks = await Promise.all(
        data.projects.map(async (project: BackendProject) => {
          const projectData = await apiRequest(
            `/projects/${project.id}`
          );

          const fullProject = projectData.project;

          return {
            ...fullProject,
            members: fullProject.members.map(
              (member: BackendProjectMember) => ({
                id: member.userId,
                name: member.user.name,
                initials: member.user.name
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase(),
                role:
                  member.role === "owner"
                    ? "owner"
                    : "member",
              })
            ),
            tasks: fullProject.tasks ?? [],
          };
        })
      );

      console.log("Projects with tasks:", projectsWithTasks);
      setProjects(projectsWithTasks);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  }

  loadProjects();
}, []);

  const createProject = (
    name: string,
    description: string,
    color: ProjectColor
  ) => {
     if (!currentUser) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      color,
      ownerId: currentUser.id,
      due: "TBD",
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          initials: currentUser.initials,
          role: "owner",
        },
      ],
      tasks: [],
    };

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ]);
  };

const addMember = async (
  projectId: string,
  email: string
) => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) return;

  try {
    const data = await apiRequest(
      `/projects/${projectId}/members`,
      {
        method: "POST",
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      }
    );

    const backendMember = data.member;

    const newMember: Member = {
      id: backendMember.user.id,
      name: backendMember.user.name,
      initials: backendMember.user.name
        .split(/\s+/)
        .map((part: string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      role: "member",
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              members: [...project.members, newMember],
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to add member:", error);
  }
};
  const removeMember = async (
  projectId: string,
  memberId: string
) => {
  try {
    await apiRequest(
      `/projects/${projectId}/members/${memberId}`,
      {
        method: "DELETE",
      }
    );

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              members: project.members.filter(
                (member) => member.id !== memberId
              ),
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to remove member:", error);
  }
};

const addTask = async (
  projectId: string,
  task: Omit<Task, "id">
) => {
  try {
    const data = await apiRequest(
      `/projects/${projectId}/tasks`,
      {
        method: "POST",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          assigneeId: task.assigneeId,
          dueDate: task.dueDate || null,
          priority: task.priority,
          status: task.status,
        }),
      }
    );

    const newTask: Task = {
      id: data.task.id,
      title: data.task.title,
      description: data.task.description ?? "",
      assigneeId: data.task.assigneeId ?? null,
      dueDate: data.task.dueDate
        ? new Date(data.task.dueDate)
            .toISOString()
            .split("T")[0]
        : "",
      priority: data.task.priority,
      status: data.task.status,
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...project.tasks, newTask],
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to create task:", error);
  }
};

const updateTask = async (
  projectId: string,
  taskId: string,
  updates: Omit<Task, "id">
) => {
  try {
    const data = await apiRequest(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: updates.title,
        description: updates.description,
        assigneeId: updates.assigneeId,
        dueDate: updates.dueDate || null,
        priority: updates.priority,
        status: updates.status,
      }),
    });

    const updatedTask: Task = {
      id: data.task.id,
      title: data.task.title,
      description: data.task.description ?? "",
      assigneeId: data.task.assigneeId ?? null,
      dueDate: data.task.dueDate
        ? new Date(data.task.dueDate)
            .toISOString()
            .split("T")[0]
        : "",
      priority: data.task.priority,
      status: data.task.status,
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

const updateTaskStatus = async (
  projectId: string,
  taskId: string,
  status: TaskStatus
) => {
  try {
    const data = await apiRequest(`/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    });

    const updatedTask: Task = {
      id: data.task.id,
      title: data.task.title,
      description: data.task.description ?? "",
      assigneeId: data.task.assigneeId ?? null,
      dueDate: data.task.dueDate
        ? new Date(data.task.dueDate)
            .toISOString()
            .split("T")[0]
        : "",
      priority: data.task.priority,
      status: data.task.status,
    };

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to update task status:", error);
  }
};
const deleteTask = async (
  projectId: string,
  taskId: string
) => {
  try {
    await apiRequest(`/tasks/${taskId}`, {
      method: "DELETE",
    });

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter(
                (task) => task.id !== taskId
              ),
            }
          : project
      )
    );
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

        const getProjectProgress = (project: Project) => {
        if (project.tasks.length === 0) {
            return 0;
        }

        const completedTasks = project.tasks.filter(
            (task) => task.status === "completed"
        ).length;

        return Math.round(
            (completedTasks / project.tasks.length) * 100
        );
        };

       const canManageProject = (project: Project) => {
          return currentUser !== null && project.ownerId === currentUser.id;
        };

        const canAccessProject = (project: Project) => {
          return (
            currentUser !== null &&
            project.members.some(
              (member) => member.id === currentUser.id
            )
          );
        };

        const canUpdateTask = (
          project: Project,
          task: Task
        ) => {
          if (!currentUser) return false;

          const isOwner = project.ownerId === currentUser.id;
          const isAssignee = task.assigneeId === currentUser.id;

          return isOwner || isAssignee;
        };

        return (
        <ProjectContext.Provider
            value={{
            currentUser,
            projects,
            createProject,
            addMember,
            removeMember,
            addTask,
            updateTask,
            updateTaskStatus,
            deleteTask,
            getProjectProgress,
            canManageProject,
            canAccessProject,
            canUpdateTask,
            }}
        >
            {children}
        </ProjectContext.Provider>
        );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used inside ProjectProvider"
    );
  }

  return context;
}

