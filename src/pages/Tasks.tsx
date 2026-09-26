import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  currentUser,
  useProjects,
  type TaskStatus,
  type TaskPriority,
} from "../context/ProjectContext";

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

function Tasks() {
  const { projects } = useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | TaskStatus
  >("all");

  const myTasks = useMemo(() => {
    return projects.flatMap((project) =>
      project.tasks
        .filter((task) => task.assigneeId === currentUser.id)
        .map((task) => ({
          ...task,
          projectName: project.name,
          projectId: project.id,
        }))
    );
  }, [projects]);

  const filteredTasks = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return myTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search) ||
        task.projectName.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [myTasks, searchTerm, statusFilter]);

  return (
    <div className="min-h-full bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          My Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View tasks assigned to you across your projects.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks or projects..."
          className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as "all" | TaskStatus
            )
          }
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="font-medium text-slate-800">
            No tasks found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tasks assigned to you will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={`${task.projectId}-${task.id}`}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Task Information */}
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {task.title}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.projectName}
                  </p>

                  {task.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Status / Priority */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}
                  >
                    {statusLabels[task.status]}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-400">
                  Due: {task.dueDate || "No due date"}
                </p>

                <Link
                  to={`/projects/${task.projectId}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Open Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;