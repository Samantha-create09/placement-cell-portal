import "./CompanyDashboard.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function CompanyDashboard() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [applications, setApplications] = useState([]);

  const [analytics, setAnalytics] = useState({
    activeJobs: 0,
    applicants: 0,
    shortlisted: 0,
    interviews: 0
  });

  useEffect(() => {

    if(user?.id){

      fetchCompany();
      fetchJobs();

    }

  }, [user]);

  const fetchCompany = async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:5000/api/companies/${user.id}`
        );

      setCompany(res.data);

    } catch(err){

      console.log(err);

    }

  };

  const fetchJobs = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/jobs"
        );
        
      const companyJobs =
        res.data.filter(

          job =>
            String(job.createdBy) ===
            String(user._id || user.id)

        );

        console.log(
          "Current User ID:",
          user.id
        );
    
        console.log(
          "All Jobs:",
          res.data
        );
    
        console.log(
          "Filtered Jobs:",
          companyJobs
        );

      setJobs(companyJobs);

      const appRes =
  await axios.get(
    "http://localhost:5000/api/applications"
  );

const companyApplications =
  appRes.data.filter(app =>
    companyJobs.some(job =>
      job._id === app.jobId
    )
  );

setApplications(
  companyApplications
);

     const totalApplicants =
  companyApplications.length;

const totalShortlisted =
  companyApplications.filter(
    app =>
      app.status ===
      "Shortlisted"
  ).length;

      setAnalytics({

        activeJobs:
          companyJobs.length,

        applicants:
          totalApplicants,

        shortlisted:
          totalShortlisted,

        interviews: 0

      });

    } catch(err){

      console.log(err);

    }

  };

  const handleLogout = () => {

    logout();
    navigate("/login");

  };

  return (

    <div className="company-dashboard">

      <aside className="company-sidebar">

        <h2>
        🎓PlacementPro
        </h2>
        
        <p className="portal-label">
        Company Portal
        </p>
        
        <nav>
          <Link to="/company-dashboard">
            Dashboard
          </Link>

          <Link to="/post-job">
            Post Job
          </Link>

          <Link to="/manage-jobs">
            Manage Jobs
          </Link>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      <main className="company-main">

        <div className="welcome-section">

          <div>

            <h1>

              Welcome,
              {" "}
              {company?.companyName || user?.name}
              {" "}
              👋

            </h1>

            <p>

              Manage recruitment,
              applications and placements.

            </p>

          </div>

        </div>

        <section className="analytics">

          <div className="card">

            <h3>Active Jobs</h3>

            <p>
              {analytics.activeJobs}
            </p>

          </div>

          <div className="card">

            <h3>Applicants</h3>

            <p>
              {analytics.applicants}
            </p>

          </div>

          <div className="card">

            <h3>Shortlisted</h3>

            <p>
              {analytics.shortlisted}
            </p>

          </div>

          <div className="card">

            <h3>Interviews</h3>

            <p>
              {analytics.interviews}
            </p>

          </div>

        </section>

        <section className="dashboard-grid">

          <div className="profile-card">

            <div className="company-icon">

              🏢

            </div>

            <h2>
            {company?.companyName || user?.name}
            </h2>
            <p>
            {company?.hrEmail || user?.email}
            </p>

            <p>
              {company?.industry}
            </p>

            <p>
              {company?.website}
            </p>

            <p>
              {company?.location}
            </p>

            <span
              className={
                company?.verified
                ?
                "verified-badge"
                :
                "pending-badge"
              }
            >
              {
                company?.verified
                ?
                "Verified Company"
                :
                "Pending Verification"
              }
            </span>

          </div>

          <div className="quick-card">

            <h2>
              Post New Job
            </h2>

            <p>

              Create placement drives
              and internships.

            </p>

            <button
              onClick={() =>
                navigate("/post-job")
              }
            >
              Create Job
            </button>

          </div>

          <div className="recent-jobs">

            <h2>
              Recent Jobs
            </h2>

            {

              jobs.length === 0

              ?

              <p>
                No jobs posted yet.
              </p>

              :

              jobs.slice(0,3).map(job => (

                <div
                  key={job._id}
                  className="mini-job-card"
                >

                  <h4>
                    {job.title}
                  </h4>

                  <p>
                    {job.location}
                  </p>

                </div>

              ))

            }

          </div>

          <div className="quick-card">

            <h2>
              Manage Jobs
            </h2>

            <p>

              View applicants,
              shortlist candidates
              and schedule interviews.

            </p>

            <button
              onClick={() =>
                navigate("/manage-jobs")
              }
            >
              Open
            </button>

          </div>

        </section>

      </main>

    </div>

  );

}

export default CompanyDashboard;