import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Projects from "../pages/Projects";
import Settings from "../pages/Settings";
import Tasks from "../pages/Tasks";
import Signup from "../Signup";
import MainLayout from "../layouts/MainLayout";
import ProjectDetails from "../pages/ProjectDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

