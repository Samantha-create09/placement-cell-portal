import "./JobDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function JobDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [isEditing, setIsEditing] =
  useState(false);

const [editData, setEditData] =
  useState({});

  const [job, setJob] =
    useState(null);

  const [applications,
    setApplications] =
    useState([]);

  useEffect(() => {

    fetchJob();
    fetchApplications();

  }, []);

  const fetchJob = async () => {

    try {

      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
        );

      setJob(res.data);
      setEditData(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchApplications =
    async () => {

      try {

        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/applications/job/${id}`
          );

        setApplications(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  const updateApplication =
    async (
      applicationId,
      data
    ) => {

      try {

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/applications/${applicationId}`,

          data

        );

        fetchApplications();

      } catch (err) {

        console.log(err);

      }

    };

  const deleteJob =
    async () => {

      const confirmDelete =
        window.confirm(
          "Delete this job?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
        );

        alert(
          "Job Deleted"
        );

        navigate(
          "/manage-jobs"
        );

      } catch (err) {

        console.log(err);

      }

    };

    const saveJob = async () => {

      try {
    
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
          editData
        );
    
        setJob(editData);
    
        setIsEditing(false);
    
        alert("Job Updated");
    
      } catch (err) {
    
        console.log(err);
    
      }
    
    };  

  if (!job) {

    return (
      <h2>Loading...</h2>
    );

  }

  const shortlistedCount =
  applications.filter(
  
  app =>
  
  app.status ===
  "Shortlisted"
  
  ).length;
  
  const selectedCount =
  applications.filter(
  
  app =>
  
  app.status ===
  "Selected"
  
  ).length;
  
  const rejectedCount =
  applications.filter(
  
  app =>
  
  app.status ===
  "Rejected"
  
  ).length;
  
  const interviewCount =
  applications.filter(
  
  app =>
  
  app.status ===
  "Interview Scheduled"
  
  ).length;
  
  return (

    <div className="job-details-page">
      <div className="job-header">

        <div>

        {
  isEditing ?

  <input
    className="edit-input"
    value={editData.title || ""}
    onChange={(e) =>
      setEditData({
        ...editData,
        title: e.target.value
      })
    }
  />

  :

  <h1>{job.title}</h1>
}

          <p className="company-name">
            {job.company}
          </p>

        </div>

        <div className="header-actions">

        {
  isEditing ?

  <button
    className="edit-btn"
    onClick={saveJob}
  >
    Save Changes
  </button>

  :

  <button
    className="edit-btn"
    onClick={() =>
      setIsEditing(true)
    }
  >
    Edit Job
  </button>
}
          <button
            className="delete-btn"
            onClick={deleteJob}
          >
            Delete Job
          </button>

        </div>

      </div>

      <div className="job-info-grid">

      <div className="info-card">

<h4>Location</h4>

{
  isEditing ?

  <input
    className="edit-input"
    value={editData.location || ""}
    onChange={(e)=>
      setEditData({
        ...editData,
        location:e.target.value
      })
    }
  />

  :

  <p>{job.location}</p>
}

</div>
<div className="info-card">

<h4>Salary</h4>

{
  isEditing ?

  <input
    className="edit-input"
    value={editData.salary || ""}
    onChange={(e)=>
      setEditData({
        ...editData,
        salary:e.target.value
      })
    }
  />

  :

  <p>₹ {job.salary}</p>
}

</div>

<div className="info-card">

<h4>Job Type</h4>

{
  isEditing ?

  <select
    className="edit-input"
    value={editData.jobType || ""}
    onChange={(e)=>
      setEditData({
        ...editData,
        jobType:e.target.value
      })
    }
  >

    <option value="">
      Select Type
    </option>

    <option value="Internship">
      Internship
    </option>

    <option value="Full Time">
      Full Time
    </option>

    <option value="Part Time">
      Part Time
    </option>

    <option value="Remote">
      Remote
    </option>

  </select>

  :

  <p>{job.jobType}</p>
}

</div>
        <div className="info-card">
          <h4>Applicants</h4>
          <p>{applications.length}</p>
        </div>

      </div>

      <div className="description-card">

        <h2>Job Description</h2>

        {
  isEditing ?

  <textarea
    className="edit-textarea"
    value={editData.description || ""}
    onChange={(e) =>
      setEditData({
        ...editData,
        description: e.target.value
      })
    }
  />

  :

  <p>{job.description}</p>
}

{
  isEditing ?

  <textarea
    className="edit-textarea"
    value={
      editData.skills?.join(", ") || ""
    }
    onChange={(e)=>
      setEditData({
        ...editData,
        skills:e.target.value
          .split(",")
          .map(skill=>skill.trim())
      })
    }
  />

  :

  <div className="skills-container">
    <h3>
  Skills Required
</h3>

    {
      job.skills?.map(
        (skill,index)=>(
          <span
            key={index}
            className="skill-badge"
          >
            {skill}
          </span>
        )
      )
    }

  </div>
}

<h3>
  Deadline
</h3>

{
  isEditing ?

  <input
    type="date"
    className="edit-input"
    value={
      editData.deadline
        ? editData.deadline.split("T")[0]
        : ""
    }
    onChange={(e) =>
      setEditData({
        ...editData,
        deadline: e.target.value
      })
    }
  />

  :

  <p>
    {
      new Date(
        job.deadline
      ).toLocaleDateString()
    }
  </p>
}

      </div>

      <div className="applications-section">

        <h2>
          Applications
        </h2>

        {

          applications.length === 0 ?

            (

              <div className="empty-state">

                No Applications Yet

              </div>

            )

            :

            applications.map(app => (

              <div
                key={app._id}
                className="applicant-card"
              >

<div className="applicant-left">

<h3>
  {app.fullName}
</h3>

<p>
  {app.email}
</p>

<p>

  CGPA:
  {" "}
  {app.cgpa || "N/A"}

</p>

<p>

  Skills:
  {" "}
  {
    app.skills?.join(", ")
  }

</p>

<p>

  Applied On:
  {" "}
  {
    new Date(
      app.createdAt
    ).toLocaleDateString()
  }

</p>

{
  app.resume &&

  <a
  href={`${import.meta.env.VITE_API_URL}${app.resume}`}
    target="_blank"
    rel="noreferrer"
    className="resume-btn"
  >
    View Resume
  </a>
}

</div>

<div className="applicant-right">

<div className="action-buttons">

  <button
    className="shortlist-btn"
    onClick={() =>
      updateApplication(
        app._id,
        {
          status:
          "Shortlisted"
        }
      )
    }
  >
    Shortlist
  </button>

  <button
    className="select-btn"
    onClick={() =>
      updateApplication(
        app._id,
        {
          status:
          "Selected"
        }
      )
    }
  >
    Select
  </button>

  <button
    className="reject-btn"
    onClick={() =>
      updateApplication(
        app._id,
        {
          status:
          "Rejected"
        }
      )
    }
  >
    Reject
  </button>

</div>

<div className="status-label">

  Status:
  {" "}
  {app.status}

</div>

<label>
  Interview Date
</label>

<input
  type="date"
  value={
    app.interviewDate || ""
  }
  onChange={(e) =>
    updateApplication(
      app._id,
      {
        interviewDate:
        e.target.value
      }
    )
  }
/>

<label>
  Meeting Link
</label>

<input
  placeholder="Google Meet Link"
  value={
    app.meetingLink || ""
  }
  onChange={(e) =>
    updateApplication(
      app._id,
      {
        meetingLink:
        e.target.value
      }
    )
  }
/>

<button
  className="interview-btn"
  onClick={() =>
    updateApplication(
      app._id,
      {
        status:
        "Interview Scheduled"
      }
    )
  }
>
  Schedule Interview
</button>

</div>

              </div>

            ))

        }

      </div>

    </div>

  );

}

export default JobDetails;