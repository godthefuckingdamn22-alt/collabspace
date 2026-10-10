import { Link } from "react-router-dom";

import { useProjects } from "../context/ProjectContext";

function RecentProjects() {
  const { currentUser, projects, getProjectProgress } = useProjects();

  if (!currentUser) {
    return null;
  }

  // A user can access a project if they are the owner
  // or a member of that project.
  const accessibleProjects = projects.filter(
    (project) =>
      project.ownerId === currentUser.id ||
      project.members.some((member) => member.id === currentUser.id)
  );

  const recentProjects = [...accessibleProjects]
    .reverse()
    .slice(0, 3);

  if (recentProjects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="font-semibold text-slate-900">
          No projects yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Create a project to start organizing your team's work.
        </p>

        <Link
          to="/projects"
          className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          View Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recentProjects.map((project) => {
        const progress = getProjectProgress(project);

        const completedTasks = project.tasks.filter(
          (task) => task.status === "completed"
        ).length;

        const totalTasks = project.tasks.length;

        const isCompleted =
          totalTasks > 0 && completedTasks === totalTasks;

        return (
          <div
            key={project.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="wrap-break-word font-semibold text-slate-900">
                  {project.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {project.description || "No description provided."}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {isCompleted ? "Completed" : "In Progress"}
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">
                  Progress
                </span>

                <span className="font-semibold text-slate-700">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-sm text-slate-500">
                {project.members.length}{" "}
                {project.members.length === 1
                  ? "member"
                  : "members"}
              </p>

              <p className="text-sm font-medium text-slate-600">
                {completedTasks}/{totalTasks} tasks
              </p>
            </div>

            <Link
              to={`/projects/${project.id}`}
              className="mt-4 block rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              Open Project
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default RecentProjects;