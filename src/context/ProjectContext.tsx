import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

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

export const currentUser = {
  id: "user-kian",
  name: "Kian",
  initials: "KA",
};

type ProjectContextType = {
  projects: Project[];
  createProject: (
    name: string,
    description: string,
    color: ProjectColor
  ) => void;
  addMember: (projectId: string, memberName: string) => void;
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
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject = (
    name: string,
    description: string,
    color: ProjectColor
  ) => {
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

  const addMember = (
    projectId: string,
    memberName: string
  ) => {
    const trimmedName = memberName.trim();

    if (!trimmedName) return;

    const member: Member = {
      id: crypto.randomUUID(),
      name: trimmedName,
      initials: trimmedName
        .split(/\s+/)
        .map((part) => part[0])
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
              members: [...project.members, member],
            }
          : project
      )
    );
  };

  const removeMember = (
    projectId: string,
    memberId: string
  ) => {
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
  };

  const addTask = (
    projectId: string,
    task: Omit<Task, "id">
  ) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
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
  };

    const updateTask = (
    projectId: string,
    taskId: string,
    updates: Omit<Task, "id">
    ) => {
    setProjects((currentProjects) =>
        currentProjects.map((project) =>
        project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                task.id === taskId
                    ? {
                        ...updates,
                        id: task.id,
                    }
                    : task
                ),
            }
            : project
        )
    );
    };

  const updateTaskStatus = (
    projectId: string,
    taskId: string,
    status: TaskStatus
  ) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, status }
                  : task
              ),
            }
          : project
      )
    );
  };

  const deleteTask = (
    projectId: string,
    taskId: string
  ) => {
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
        return project.ownerId === currentUser.id;
        };

        const canAccessProject = (project: Project) => {
        return project.members.some(
            (member) => member.id === currentUser.id
        );
        };

        const canUpdateTask = (
        project: Project,
        task: Task
        ) => {
        const isOwner = project.ownerId === currentUser.id;
        const isAssignee = task.assigneeId === currentUser.id;

        return isOwner || isAssignee;
        };

        return (
        <ProjectContext.Provider
            value={{
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

