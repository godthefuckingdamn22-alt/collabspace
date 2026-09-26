import { useMemo, useState } from "react";

type Member = {
  id: number;
  name: string;
  initials: string;
};

type ProjectColor = "indigo" | "blue" | "green" | "red";

type Project = {
  id: number;
  name: string;
  description: string;
  color: ProjectColor;
  owner: string;
  due: string;
  progress: number;
  members: Member[];
};
const colorClasses: Record<ProjectColor, string> = {
  indigo: "bg-indigo-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
};

function Projects() {
  const [showForm, setShowForm] = useState(false);

  const [projectList, setProjectList] = useState<Project[]>([]);

  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectColor, setNewProjectColor] =
    useState<ProjectColor>("indigo");

  const [searchTerm, setSearchTerm] = useState("");

  // Stores the member currently being typed for each project
  const [newMember, setNewMember] = useState<Record<number, string>>({});

  // Create project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

   const newProject: Project = {
  id: Date.now(),
  name: newProjectName.trim(),
  description: newProjectDescription.trim(),
  color: newProjectColor,
  owner: "You",
  due: "TBD",
  progress: 0,
  members: [],
};

    setProjectList((currentProjects) => [
      ...currentProjects,
      newProject,
    ]);

    setNewProjectName("");
    setNewProjectDescription("");
    setNewProjectColor("indigo");
    setShowForm(false);
  };

  // Add member to a project
  const handleAddMember = (projectId: number) => {
    const memberName = newMember[projectId]?.trim();

    if (!memberName) return;

    const member: Member = {
      id: Date.now(),
      name: memberName,
      initials: memberName
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };

    setProjectList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              members: [...project.members, member],
            }
          : project
      )
    );

    setNewMember((currentMembers) => ({
      ...currentMembers,
      [projectId]: "",
    }));
  };

  // Remove member from a project
  const handleRemoveMember = (
    projectId: number,
    memberId: number
  ) => {
    setProjectList((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              members: project.members.filter(
                (member) => member.id !== memberId
              ),
            }
          : project
      )
    );
  };

  // Search projects
  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const search = searchTerm.toLowerCase();

      return (
        project.name.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search)
      );
    });
  }, [projectList, searchTerm]);

  return (
    <div className="min-h-full bg-slate-50 px-4 py-5 sm:p-6">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and organize your team's projects
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          + New project
        </button>
      </div>

      {/* Search */}
     <div className="mb-6 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* New Project Form */}
      {showForm && (
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Create New Project
          </h2>

          <div className="space-y-4">

            {/* Project Name */}
            <input
              type="text"
              placeholder="Project name"
              value={newProjectName}
              onChange={(e) =>
                setNewProjectName(e.target.value)
              }
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              value={newProjectDescription}
              onChange={(e) =>
                setNewProjectDescription(e.target.value)
              }
             className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            {/* Card Color */}
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Card Color
              </p>

              <div className="flex gap-2">

                {/* Indigo */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("indigo")}
                 className={`h-9 w-9 rounded-full bg-indigo-500 ring-2 ring-offset-2 transition ${
                    newProjectColor === "indigo"
                      ? "ring-indigo-500"
                      : "ring-transparent"
                  } hover:ring-indigo-300`}
                />

                {/* Blue */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("blue")}
                 className={`h-9 w-9 rounded-full bg-blue-500 ring-2 ring-offset-2 transition ${
                    newProjectColor === "blue"
                      ? "ring-blue-500"
                      : "ring-transparent"
                  } hover:ring-blue-300`}
                />

                {/* Green */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("green")}
                  className={`h-9 w-9 rounded-full bg-green-500 ring-2 ring-offset-2 transition ${
                    newProjectColor === "green"
                      ? "ring-green-500"
                      : "ring-transparent"
                  } hover:ring-green-300`}
                />

                {/* Red */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("red")}
                  className={`h-9 w-9 rounded-full bg-red-500 ring-2 ring-offset-2 transition ${
                    newProjectColor === "red"
                      ? "ring-red-500"
                      : "ring-transparent"
                  } hover:ring-red-300`}
                />
              </div>
            </div>

            {/* Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateProject}
               className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:w-auto"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

     {/* Project Count */}
<div className="mb-4 flex items-center justify-between">
  <p className="text-sm font-medium text-slate-700">
    {filteredProjects.length}{" "}
    {filteredProjects.length === 1 ? "project" : "projects"}
  </p>

  {searchTerm && (
    <p className="text-xs text-slate-400">
      Searching for "{searchTerm}"
    </p>
  )}
</div>

      {/* Projects List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
  key={project.id}
  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
>

            {/* Color Accent */}
            <div
              className={`h-2 ${colorClasses[project.color]}`}
            />

           {/* Card Content */}
<div className="p-5 sm:p-6">

              {/* Project Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">

                    <span
                      className={`h-3 w-3 rounded-full ${
                        colorClasses[project.color]
                      }`}
                    />

                    <h3 className="font-semibold text-slate-900">
                      {project.name}
                    </h3>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.description}
                  </p>
                </div>

               <div className="shrink-0 text-left sm:text-right">
  <p className="text-sm font-medium text-slate-700">
    {project.owner}
  </p>

  <p className="text-xs text-slate-500">
    Due: {project.due}
  </p>
</div>
              </div>
{/* Progress */}
<div className="mt-5">
  <div className="mb-2 flex items-center justify-between">
    <span className="text-sm font-medium text-slate-700">
      Progress
    </span>

    <span className="text-sm font-semibold text-slate-900">
      {project.progress}%
    </span>
  </div>

  <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
    <div
      className={`h-full rounded-full transition-all duration-300 ${
        colorClasses[project.color]
      }`}
      style={{
        width: `${project.progress}%`,
      }}
    />
  </div>
</div>
              {/* Members */}
              <div className="mt-6 border-t border-slate-100 pt-5">
               <div className="mb-3 flex items-center justify-between">
  <p className="text-sm font-semibold text-slate-800">
    Members
  </p>

  <span className="text-xs text-slate-400">
    {project.members.length}
  </span>
</div>

                {/* Add Member */}
                <div className="mb-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter member name..."
                    value={newMember[project.id] || ""}
                    onChange={(e) =>
                      setNewMember((currentMembers) => ({
                        ...currentMembers,
                        [project.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddMember(project.id);
                      }
                    }}
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleAddMember(project.id)
                    }
                    className="rounded-md bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
                  >
                    Add
                  </button>
                </div>

                {/* Member List */}
                <div className="flex flex-wrap gap-2">
                  {project.members.length === 0 ? (
                    <p className="text-xs text-slate-400">
                      No members yet.
                    </p>
                  ) : (
                    project.members.map((member) => (
                     <div
  key={member.id}
  className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm transition hover:border-slate-300 hover:shadow"
>
  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
    {member.initials}
  </span>

  <span className="max-w-32 truncate text-sm font-medium text-slate-700">
    {member.name}
  </span>

  <button
    type="button"
    onClick={() =>
      handleRemoveMember(
        project.id,
        member.id
      )
    }
    className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-500"
    aria-label={`Remove ${member.name}`}
  >
    ×
  </button>
</div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

     {/* Empty State */}
{filteredProjects.length === 0 && (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-xl">
      {searchTerm ? "🔎" : "📁"}
    </div>

    <h3 className="text-sm font-semibold text-slate-800">
      {searchTerm ? "No matching projects" : "No projects yet"}
    </h3>

    <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
      {searchTerm
        ? "Try a different search term."
        : "Create your first project to get started."}
    </p>

    {!searchTerm && (
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        + New project
      </button>
    )}
  </div>
)}
      )
    </div>
  );
}

export default Projects;

