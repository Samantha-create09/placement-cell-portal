import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import ApplicationPage from "./pages/ApplicationPage";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import JobDetails from "./pages/JobDetails";

import AdminStudents from "./pages/AdminStudents";
import AdminCompanies from "./pages/AdminCompanies";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";  

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

  {/* PUBLIC */}

  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* STUDENT */}

  <Route
    path="/student-dashboard"
    element={
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs"
    element={
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/applications"
    element={
      <ProtectedRoute>
        <Applications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/apply/:id"
    element={
      <ProtectedRoute>
        <ApplicationPage />
      </ProtectedRoute>
    }
  />

  {/* COMPANY */}

  <Route
    path="/company-dashboard"
    element={
      <ProtectedRoute>
        <CompanyDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/post-job"
    element={
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    }
  />

  <Route
    path="/manage-jobs"
    element={
      <ProtectedRoute>
        <ManageJobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/job/:id"
    element={
      <ProtectedRoute>
        <JobDetails />
      </ProtectedRoute>
    }
  />

  {/* ADMIN */}

  <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
 
 <Route
  path="/admin-students"
  element={
    <ProtectedRoute>
      <AdminStudents />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-companies"
  element={
    <ProtectedRoute>
      <AdminCompanies />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-jobs"
  element={
    <ProtectedRoute>
      <AdminJobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-applications"
  element={
    <ProtectedRoute>
      <AdminApplications />
    </ProtectedRoute>
  }
/>
</Routes>
  );
}

export default App;