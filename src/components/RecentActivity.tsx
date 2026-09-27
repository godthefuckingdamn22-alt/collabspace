import {
  CheckCircle2,
  Clock3,
  ListPlus,
} from "lucide-react";

import {
  currentUser,
  useProjects,
} from "../context/ProjectContext";

function RecentActivity() {
  const { projects } = useProjects();

  const accessibleProjects = projects.filter((project) =>
    project.members.some(
      (member) => member.id === currentUser.id
    )
  );

  const activities = accessibleProjects
    .flatMap((project) =>
      project.tasks.map((task) => ({
        id: `${project.id}-${task.id}`,
        task,
        projectName: project.name,
      }))
    )
    .slice(-5)
    .reverse();

  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="font-semibold text-slate-900">
          No recent activity
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Task activity will appear here as your projects
          start progressing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {activities.map((activity, index) => {
        const { task, projectName } = activity;

        const isCompleted = task.status === "completed";
        const isInProgress = task.status === "in-progress";

        const Icon = isCompleted
          ? CheckCircle2
          : isInProgress
            ? Clock3
            : ListPlus;

        const action = isCompleted
          ? "completed"
          : isInProgress
            ? "started working on"
            : "created";

        return (
          <div
            key={activity.id}
            className={`flex items-start gap-4 p-5 ${
              index !== activities.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Icon size={18} strokeWidth={2} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-slate-900">
                  {currentUser.name}
                </span>{" "}
                {action}{" "}
                <span className="font-medium text-slate-900">
                  {task.title}
                </span>{" "}
                in{" "}
                <span className="font-medium text-indigo-600">
                  {projectName}
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Current status:{" "}
                {task.status === "todo"
                  ? "To Do"
                  : task.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecentActivity;

