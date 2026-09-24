import { useParams, Link } from "react-router-dom";
import { useState } from "react";

import {
  useProjects,
  type TaskStatus,
  type TaskPriority,
} from "../context/ProjectContext";

const statusColumns: {
  status: TaskStatus;
  title: string;
}[] = [
  {
    status: "todo",
    title: "To Do",
  },
  {
    status: "in-progress",
    title: "In Progress",
  },
  {
    status: "completed",
    title: "Completed",
  },
];

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};
function ProjectDetails() {
  const { projectId } = useParams();

  const {
    projects,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getProjectProgress,
    canManageProject,
    canAccessProject,
    canUpdateTask,
    removeMember,
    } = useProjects();


  const [showTaskForm, setShowTaskForm] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] =
    useState<TaskPriority>("medium");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(
    null
  );

  const project = projects.find(
    (item) => item.id === projectId
  );

  const handleSaveTask = () => {
    if (!project || !taskTitle.trim()) return;

    const existingTask = editingTaskId
      ? project.tasks.find(
          (task) => task.id === editingTaskId
        )
      : undefined;

    const taskData = {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      assigneeId: taskAssignee || null,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: existingTask?.status ?? "todo" as TaskStatus,
    };

    if (editingTaskId) {
      updateTask(
        project.id,
        editingTaskId,
        taskData
      );
    } else {
      addTask(project.id, taskData);
    }

    setTaskTitle("");
    setTaskDescription("");
    setTaskAssignee("");
    setTaskDueDate("");
    setTaskPriority("medium");
    setEditingTaskId(null);
    setShowTaskForm(false);
  };

  const handleEditTask = (taskId: string) => {
    const task = project?.tasks.find(
      (item) => item.id === taskId
    );

    if (!task) return;

    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskAssignee(task.assigneeId ?? "");
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
    setEditingTaskId(task.id);
    setShowTaskForm(true);
  };

  if (!project) {
        return (
            <div className="min-h-full bg-slate-50 p-6">
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                <h1 className="text-xl font-semibold text-slate-900">
                Project not found
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                The project you are looking for does not exist.
                </p>

                <Link
                to="/projects"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                ← Back to Projects
                </Link>
            </div>
            </div>
        );
        }

        if (!canAccessProject(project)) {
        return (
            <div className="min-h-full bg-slate-50 p-6">
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                <h1 className="text-xl font-semibold text-slate-900">
                Access Restricted
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                You are not a member of this project.
                </p>

                <Link
                to="/projects"
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                ← Back to Projects
                </Link>
            </div>
            </div>
        );
        }

  const progress = getProjectProgress(project);
  const isProjectOwner = canManageProject(project);

  return (
    <div className="min-h-full bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <Link
          to="/projects"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Projects
        </Link>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-indigo-500" />

              <h1 className="text-2xl font-bold text-slate-900">
                {project.name}
              </h1>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {project.description}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Due
            </p>

            <p className="font-medium text-slate-800">
              {project.due}
            </p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        {/* Progress */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Progress
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {progress}%
          </p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Tasks */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Total Tasks
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {project.tasks.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Tasks in this project
          </p>
        </div>

        {/* Members */}
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Members
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {project.members.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            People working on this project
          </p>
        </div>
      </div>

      {/* Members */}
      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Members
          </h2>

          <p className="text-sm text-slate-500">
            People working on this project.
          </p>
        </div>

        <div className="space-y-3">
          {project.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-md border border-slate-100 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {member.initials}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {member.name}
                  </p>

                  <p className="text-xs capitalize text-slate-400">
                    {member.role}
                  </p>
                </div>
              </div>

              {member.role === "owner" ? (
                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    Owner
                </span>
                ) : (
                isProjectOwner && (
                    <button
                    type="button"
                    onClick={() =>
                        removeMember(project.id, member.id)
                    }
                    className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                    Remove
                    </button>
                )
                )}

            </div>
          ))}
        </div>
      </div>

      {/* Tasks Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Tasks
          </h2>

          <p className="text-sm text-slate-500">
            Manage tasks for {project.name}
          </p>
        </div>

        {isProjectOwner && (
            <button
                type="button"
                onClick={() => setShowTaskForm((current) => !current)}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
                {showTaskForm ? "Cancel" : "+ Add Task"}
            </button>
            )}
      </div>

      {showTaskForm && (
  <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5">
    <h3 className="text-base font-semibold text-slate-900">
    {editingTaskId ? "Edit Task" : "Create Task"}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      {editingTaskId
  ? `Update this task in ${project.name}.`
  : `Add a task to ${project.name}.`}
    </p>

    <div className="mt-4 grid gap-4 md:grid-cols-2">
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Task Title
        </label>

        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="e.g. Create login page"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Assignee */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Assign To
        </label>

        <select
          value={taskAssignee}
          onChange={(e) => setTaskAssignee(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Unassigned</option>

          {project.members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe what needs to be done..."
          rows={3}
          className="mt-1 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Due Date
        </label>

        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium text-slate-700">
          Priority
        </label>

        <select
          value={taskPriority}
          onChange={(e) =>
            setTaskPriority(e.target.value as TaskPriority)
          }
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <div className="mt-5 flex justify-end">
      <button
        type="button"
        onClick={handleSaveTask}
        disabled={!taskTitle.trim()}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {editingTaskId ? "Save Changes" : "Create Task"}
      </button>
    </div>
  </div>
)}

      {/* Kanban Board */}
      <div className="grid gap-4 lg:grid-cols-3">
        {statusColumns.map((column) => {
          const columnTasks = project.tasks.filter(
            (task) => task.status === column.status
          );

          return (
            <div
              key={column.status}
              className="min-h-[400px] rounded-lg border border-slate-200 bg-slate-100 p-4"
            >
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">
                  {column.title}
                </h3>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="rounded-md border border-dashed border-slate-300 bg-white/50 p-6 text-center">
                    <p className="text-xs text-slate-400">
                      No tasks
                    </p>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-medium text-slate-900">
                          {task.title}
                        </h4>

                        {isProjectOwner && (
                            <div className="flex items-center gap-2">
                                <button
                                type="button"
                                onClick={() => handleEditTask(task.id)}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                                >
                                Edit
                                </button>

                                <button
                                type="button"
                                onClick={() =>
                                    deleteTask(project.id, task.id)
                                }
                                className="text-slate-400 hover:text-red-500"
                                aria-label={`Delete ${task.title}`}
                                >
                                ×
                                </button>
                            </div>
                            )}
                      </div>

                      {task.description && (
                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                          {task.description}
                        </p>
                      )}

                      {/* Priority */}
                      <div className="mt-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-medium ${priorityStyles[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      {/* Assignee */}
                      <div className="mt-3">
                        <p className="text-xs text-slate-400">
                          Assigned to
                        </p>

                        <p className="text-sm text-slate-700">
                          {task.assigneeId
                            ? project.members.find(
                                (member) =>
                                  member.id === task.assigneeId
                              )?.name ?? "Unknown member"
                            : "Unassigned"}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="mt-4 border-t border-slate-100 pt-3">
                        <label className="text-xs font-medium text-slate-500">
                            Status
                        </label>

                        {canUpdateTask(project, task) ? (
                            <select
                            value={task.status}
                            onChange={(e) =>
                                updateTaskStatus(
                                project.id,
                                task.id,
                                e.target.value as TaskStatus
                                )
                            }
                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            </select>
                        ) : (
                            <span
                            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}
                            >
                            {statusLabels[task.status]}
                            </span>
                        )}
                        </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectDetails;

