interface Project {
  name: string;
  description: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  members: number;
  status: "In Progress" | "Completed";
}

const projects: Project[] = [
  {
    name: "CollabSpace",
    description: "Collaborative workspace for teams.",
    progress: 72,
    completedTasks: 13,
    totalTasks: 18,
    members: 3,
    status: "In Progress",
  },
  {
    name: "Smart Pipeline",
    description: "IoT-based water monitoring project.",
    progress: 100,
    completedTasks: 12,
    totalTasks: 12,
    members: 4,
    status: "Completed",
  },
  {
    name: "Portfolio Website",
    description: "Personal developer portfolio.",
    progress: 58,
    completedTasks: 7,
    totalTasks: 12,
    members: 2,
    status: "In Progress",
  },
];

function RecentProjects() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.name}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                {project.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {project.description}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                project.status === "Completed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-indigo-50 text-indigo-700"
              }`}
            >
              {project.status}
            </span>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">
                Progress
              </span>

              <span className="font-semibold text-slate-700">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              {project.members} team members
            </p>

            <p className="text-sm font-medium text-slate-600">
              {project.completedTasks}/{project.totalTasks} tasks
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentProjects;