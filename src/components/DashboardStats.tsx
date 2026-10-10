import {
  FolderKanban,
  ListChecks,
  CheckCircle2,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useProjects } from "../context/ProjectContext";

interface StatCard {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

function DashboardStats() {
  const { currentUser, projects } = useProjects();

  if (!currentUser) {
    return null;
  }

  // Projects the current user owns or is a member of.
  const accessibleProjects = projects.filter(
    (project) =>
      project.ownerId === currentUser.id ||
      project.members.some((member) => member.id === currentUser.id)
  );

  const allTasks = accessibleProjects.flatMap(
    (project) => project.tasks
  );

  const activeTasks = allTasks.filter(
    (task) => task.status !== "completed"
  ).length;

  const completedTasks = allTasks.filter(
    (task) => task.status === "completed"
  ).length;

  const uniqueMembers = new Set(
    accessibleProjects.flatMap((project) =>
      project.members.map((member) => member.id)
    )
  );

  // Include project owners as team members when they are not
  // already included in the project's member list.
  accessibleProjects.forEach((project) => {
    uniqueMembers.add(project.ownerId);
  });

  const stats: StatCard[] = [
    {
      label: "Projects",
      value: accessibleProjects.length,
      description: "Projects you have access to",
      icon: FolderKanban,
    },
    {
      label: "Active Tasks",
      value: activeTasks,
      description: "Tasks not yet completed",
      icon: ListChecks,
    },
    {
      label: "Completed",
      value: completedTasks,
      description: "Tasks completed across projects",
      icon: CheckCircle2,
    },
    {
      label: "Team Members",
      value: uniqueMembers.size,
      description: "Unique members across projects",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon size={20} strokeWidth={2} />
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;