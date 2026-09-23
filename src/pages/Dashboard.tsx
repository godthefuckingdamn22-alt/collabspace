import DashboardStats from "../components/DashboardStats";
import RecentProjects from "../components/RecentProjects";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back, Kian 👋
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Overview */}
      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-900">
          Overview
        </h2>

        <DashboardStats />
      </section>

      {/* Recent Projects */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep track of your team's latest work.
            </p>
          </div>

          <button className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
            View all
          </button>
        </div>

        <RecentProjects />
      </section>

      {/* Recent Activity */}
     <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with what's happening in your workspace.
          </p>
        </div>

        <RecentActivity />
      </section>
    </div>
  );
}

export default Dashboard;