import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import "animate.css/animate.min.css";
import Admin from "./Pages/Administration/Admin";
import ContributionRequests from "./Pages/ContributionRequests/ContributionRequests";
import CreateNew from "./Pages/GenerateProject/CreateNew";
import MyProjects from "./Pages/MyProjects/MyProjects";
import Notifications from "./Pages/Notifications/Notifications";
import Profile from "./Pages/Profile/Profile";
import ProjectOverview from "./Pages/ProjectOverview/ProjectOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/contributions" element={<ContributionRequests />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/administration" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/project-overview/:project_id"
          element={<ProjectOverview />}
        />
      </Routes>
    </Router>
  );
}

export default App;
