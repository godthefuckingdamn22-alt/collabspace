import { useState } from "react";

type Project = {
  name: string;
  description: string;
  progress: number;
  color: string;
  iconColor: string;
  owner: string;
  due: string;
};
function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            All active and recent projects
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + New project
        </button>
      </div>

      {/* New Project Form */}
      {showForm && (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Create New Project
          </h2>

          <div className="space-y-4">
           <input
  type="text"
  placeholder="Project name"
  value={newProjectName}
  onChange={(e) => setNewProjectName(e.target.value)}
  className="w-full rounded-md border border-slate-300 px-3 py-2"
/>
            <input
  type="text"
  placeholder="Description"
  value={newProjectDescription}
  onChange={(e) => setNewProjectDescription(e.target.value)}
  className="w-full rounded-md border border-slate-300 px-3 py-2"
/>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
              >
                Cancel
              </button>

              <button
  onClick={() => {
    if (!newProjectName.trim()) return;

    const newProject = {
      name: newProjectName,
      description: newProjectDescription,
      progress: 0,
      color: "bg-indigo-500",
      iconColor: "bg-indigo-100 text-indigo-600",
      owner: "You",
      due: "TBD",
    };

    setProjectList([...projectList, newProject]);
   setNewProjectName("");
setNewProjectDescription("");
setShowForm(false);
  }}
  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
>
  Create Project
</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
       {projectList.map((project) => (
          <div
            key={project.name}
            className="border-b border-slate-200 p-4 last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {project.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {project.description}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">
                  {project.owner}
                </p>

                <p className="text-sm text-slate-500">
                  {project.due}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${project.color}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

