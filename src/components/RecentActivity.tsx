interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
  icon: string;
}

const activities: Activity[] = [
  {
    user: "Kian",
    action: "completed a task in",
    target: "CollabSpace",
    time: "10 minutes ago",
    icon: "✓",
  },
  {
    user: "Dan",
    action: "started working on",
    target: "Projects",
    time: "32 minutes ago",
    icon: "→",
  },
  {
    user: "Con",
    action: "created a task in",
    target: "CollabSpace",
    time: "1 hour ago",
    icon: "＋",
  },
  {
    user: "Kian",
    action: "updated",
    target: "Portfolio Website",
    time: "2 hours ago",
    icon: "✎",
  },
];

function RecentActivity() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {activities.map((activity, index) => (
        <div
          key={`${activity.user}-${activity.time}`}
          className={`flex items-start gap-4 p-5 ${
            index !== activities.length - 1
              ? "border-b border-slate-100"
              : ""
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-medium text-indigo-600">
            {activity.icon}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                {activity.user}
              </span>{" "}
              {activity.action}{" "}
              <span className="font-medium text-indigo-600">
                {activity.target}
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;