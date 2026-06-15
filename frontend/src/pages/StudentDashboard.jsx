import "./StudentDashboard.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState([]);
  useEffect(() => {

    if (user?.skills) {
  
      setSkills(user.skills);
  
    }
  
  }, [user]);

  const [analytics, setAnalytics] =
useState({
  applications: 0,
  shortlisted: 0,
  interviews: 0,
  offers: 0
});

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const addSkill = async () => {

    if (!skillInput.trim()) return;
  
    try {
  
      const updatedSkills = [
        ...skills,
        skillInput
      ];
  
      const res = await axios.put(
        `http://localhost:5000/api/students/${user.id}/skills`,
        {
          skills: updatedSkills
        }
      );
      console.log(res.data);

      setSkills(res.data.skills);
  
      setSkillInput("");
  
      alert("Skill Added Successfully");
  
    } catch (error) {
  
      console.log(error.response?.data);
  
      alert("Failed to add skill");
    }
  
  };

  const uploadResume = async () => {

    if (!resume) return;
  
    const formData = new FormData();
  
    formData.append(
      "resume",
      resume
    );
  
    try {
  
      await axios.post(
        `http://localhost:5000/api/students/resume/${user.id}`,
        formData
      );
  
      alert("Resume uploaded");
  
    } catch (error) {
  
      console.log(error);
  
    }
  };

  const fetchJobs = async () => {

    try {
  
      const res = await axios.get(
        "http://localhost:5000/api/jobs"
      );
  
      setJobs(res.data);
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };
  useEffect(() => {

    fetchJobs();
  
  }, []);

  const fetchAnalytics = async () => {

    const res = await axios.get(
      `http://localhost:5000/api/analytics/${user.id}`
    );
  
    setAnalytics(res.data);
  
  };
  useEffect(() => {
    if (user?.id) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchStudent = async () => {

    try {
  
      const res = await axios.get(
        `http://localhost:5000/api/students/${user.id}`
      );
  
      setSkills(
        res.data.skills || []
      );
  
      setResumeUrl(
        res.data.resumeUrl || ""
      );
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };
  useEffect(() => {

    if (user?.id) {
  
      fetchStudent();
  
    }
  
  }, [user]);

  const fetchStudentProfile = async () => {

    if (!user?.id) return;
  
    try {
  
      const res = await axios.get(
        `http://localhost:5000/api/students/${user.id}`
      );
  
      setSkills(
        res.data.skills || []
      );
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };
  useEffect(() => {
    fetchStudentProfile();
  }, []);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">🎓 PlacementPro</h2>

        <div className="profile-card">

  <div className="avatar">
    {user?.name?.charAt(0)}
  </div>

  <h3>{user?.name}</h3>

  <span>
    Student Portal
  </span>

</div>
<nav>

<Link to="/student-dashboard" className="active">
  Dashboard
</Link>

<Link to="/jobs">
  Jobs
</Link>

<Link to="/applications">
  Applications
</Link>

</nav>  

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="main">

      <div className="welcome-section">

<div>
  <h1>
    Welcome back, {user?.name} 👋
  </h1>

  <p>
    Here's what's happening with your placements.
  </p>
</div>

</div>

{/* ANALYTICS */}
<section className="analytics">

<div className="a-card">
  <h3>Applications</h3>
  <p>{analytics.applications}</p>
</div>

<div className="a-card">
  <h3>Shortlisted</h3>
  <p>{analytics.shortlisted}</p>
</div>

<div className="a-card">
  <h3>Interviews</h3>
  <p>{analytics.interviews}</p>
</div>

<div className="a-card highlight">
  <h3>Offers</h3>
  <p>{analytics.offers}</p>
</div>

</section>

        {/* SKILLS + RESUME + DEADLINES */}
        <section className="grid">

        <div className="box">

        <h2>Skills</h2>

{skills.length === 0 ? (

  <p className="muted">
    No skills added yet
  </p>

) : (

  <div className="tags">

    {skills.map((skill, index) => (

      <span key={index}>
        {skill}
      </span>

    ))}

  </div>

)}

<input
  type="text"
  value={skillInput}
  placeholder="Enter skill"
  onChange={(e) =>
    setSkillInput(e.target.value)
  }
/>

<button
  className="btn"
  onClick={addSkill}
>
  Add Skill
</button>
</div>
<div className="box resume-box">

  <h2>Resume</h2>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setResume(e.target.files[0])
    }
  />

  <button
    className="btn"
    onClick={uploadResume}
  >
    Upload Resume
  </button>

  {
    resumeUrl ? (

      <div className="resume-status">

        <p className="success-text">
          ✅ Resume Uploaded
        </p>

        <a
          href={`http://localhost:5000/uploads/${resumeUrl}`}
          target="_blank"
          rel="noreferrer"
          className="resume-view-btn"
        >
          View Resume
        </a>

      </div>

    ) : (

      <p className="muted">
        No resume uploaded
      </p>

    )
  }

</div>
          <div className="box">
            <h2>Deadlines</h2>
            {

jobs.length === 0 ?

(

<div className="empty-state">
No deadlines available
</div>

)

:

(

jobs
.filter(job => job.deadline)
.slice(0,3)
.map(job => (

<div
  key={job._id}
  className="deadline-item"
>

<h4>
{job.title}
</h4>

<p>

{
new Date(
job.deadline
).toLocaleDateString()
}

</p>

</div>

))

)

}
          </div>

        </section>

        {/* JOBS */}
        <section className="jobs-section">

          <h2>Recent Jobs</h2>

          <div className="job-list">

  {jobs.length === 0 ? (

    <p className="muted">
      No jobs available yet.
    </p>

  ) : (

    jobs.map((job) => (

      <div
      className="job-card"
      key={job._id}
    >
    
      <h3>
        {job.title}
      </h3>
    
      <p>
        <strong>
          {job.company}
        </strong>
      </p>
    
      <p>
        📍 {job.location}
      </p>
    
      <p>
        💰 ₹ {job.salary}
      </p>
    
      <p>
        🕒 {job.jobType}
      </p>
    
      <p>
        {job.description}
      </p>
    
      <button
        className="apply-btn"
        onClick={() =>
          navigate(`/apply/${job._id}`)
        }
      >
        Apply
      </button>
    
    </div>
    ))

  )}

</div>

        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;