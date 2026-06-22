import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [analytics, setAnalytics] =
  useState({

    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0

  });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res =
        await axios.get(
          '${import.meta.env.VITE_API_URL}/api/analytics/admin'
        );

      setAnalytics(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleLogout = () => {

    logout();
    navigate("/login");

  };

  return (

    <div className="admin-dashboard">

      <aside className="admin-sidebar">

        <h2>
          🎓 PlacementPro
        </h2>

        <p className="portal-label">
          Admin Portal
        </p>

        <nav>

          <Link to="/admin-dashboard">
            Dashboard
          </Link>

          <Link to="/admin-students">
            Students
          </Link>

          <Link to="/admin-companies">
            Companies
          </Link>

          <Link to="/admin-jobs">
            Jobs
          </Link>

          <Link to="/admin-applications">
            Applications
          </Link>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="admin-main">

        <div className="welcome-section">

          <h1>
            Welcome Admin 👋
          </h1>

          <p>
            Manage students, companies,
            jobs and applications.
          </p>

        </div>

        <section className="analytics-grid">

          <div className="analytics-card students-card">
          <span>🎓</span>
            <h3>
              Students
            </h3>

            <p>
              {analytics.totalStudents}
            </p>

          </div>

          <div className="analytics-card companies-card">
          <span>🏢</span>
            <h3>
              Companies
            </h3>

            <p>
              {analytics.totalCompanies}
            </p>

          </div>

          <div className="analytics-card jobs-card">
          <span>💼</span>
            <h3>
              Jobs
            </h3>

            <p>
              {analytics.totalJobs}
            </p>

          </div>

          <div className="analytics-card applications-card">
          <span>📄</span>
            <h3>
              Applications
            </h3>

            <p>
              {analytics.totalApplications}
            </p>

          </div>

        </section>

      </main>

    </div>

  );

}

export default AdminDashboard;