import {
  FolderKanban,
  ListChecks,
  Users,
  type LucideIcon,
} from "lucide-react";

interface StatCard {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

const stats: StatCard[] = [
  {
    label: "Projects",
    value: "12",
    description: "3 active projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    value: "24",
    description: "8 tasks completed",
    icon: ListChecks,
  },
  {
    label: "Team Members",
    value: "8",
    description: "4 teams active",
    icon: Users,
  },
];

function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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