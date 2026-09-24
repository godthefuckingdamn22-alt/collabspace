import { useMemo, useState } from "react";

type Member = {
  id: string;
  name: string;
  initials: string;
};

type ProjectColor = "indigo" | "blue" | "green" | "red";

type Project = {
  id: string;
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
  const [newMember, setNewMember] = useState<Record<string, string>>({});

  // Create project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

   const newProject: Project = {
  id: crypto.randomUUID(),
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
  const handleAddMember = (projectId: string) => {
    const memberName = newMember[projectId]?.trim();

    if (!memberName) return;

    const member: Member = {
      id: crypto.randomUUID(),
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
      projectId: string,
      memberId: string
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
    <div className="min-h-full bg-slate-50 p-6">

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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              value={newProjectDescription}
              onChange={(e) =>
                setNewProjectDescription(e.target.value)
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2"
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
                  className={`h-8 w-8 rounded-full bg-indigo-500 ring-2 ring-offset-2 ${
                    newProjectColor === "indigo"
                      ? "ring-indigo-500"
                      : "ring-transparent"
                  } hover:ring-indigo-300`}
                />

                {/* Blue */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("blue")}
                  className={`h-8 w-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ${
                    newProjectColor === "blue"
                      ? "ring-blue-500"
                      : "ring-transparent"
                  } hover:ring-blue-300`}
                />

                {/* Green */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("green")}
                  className={`h-8 w-8 rounded-full bg-green-500 ring-2 ring-offset-2 ${
                    newProjectColor === "green"
                      ? "ring-green-500"
                      : "ring-transparent"
                  } hover:ring-green-300`}
                />

                {/* Red */}
                <button
                  type="button"
                  onClick={() => setNewProjectColor("red")}
                  className={`h-8 w-8 rounded-full bg-red-500 ring-2 ring-offset-2 ${
                    newProjectColor === "red"
                      ? "ring-red-500"
                      : "ring-transparent"
                  } hover:ring-red-300`}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateProject}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Count */}
      <p className="mb-3 text-sm text-slate-500">
        {filteredProjects.length} project(s)
      </p>

      {/* Projects List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >

            {/* Color Accent */}
            <div
              className={`h-2 ${colorClasses[project.color]}`}
            />

            {/* Card Content */}
            <div className="p-5">

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
<div className="mt-5">
  <div className="mb-2 flex items-center justify-between">
    <span className="text-xs font-medium text-slate-500">
      Progress
    </span>

    <span className="text-xs font-semibold text-slate-700">
      {project.progress}%
    </span>
  </div>

  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
    <div
      className={`h-full rounded-full ${
        colorClasses[project.color]
      }`}
      style={{
        width: `${project.progress}%`,
      }}
    />
  </div>
</div>
              {/* Members */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Members
                </p>

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
                        className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {member.initials}
                        </span>

                        <span className="text-sm text-slate-700">
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
                          className="text-slate-400 hover:text-red-500"
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
          <p className="text-sm text-slate-500">
            No projects found.
          </p>
        </div>
      )}
    </div>
  );
}

export default Projects;