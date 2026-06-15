import "./AdminJobs.css";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminJobs() {

  const [jobs, setJobs] = useState([]);
const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {
  
      const jobsRes =
        await axios.get(
          "http://localhost:5000/api/jobs"
        );
  
      const appsRes =
        await axios.get(
          "http://localhost:5000/api/applications"
        );
  
      setJobs(jobsRes.data);
  
      setApplications(
        appsRes.data
      );
  
    }
  
    catch(error){
  
      console.log(error);
  
    }
  
  };

  const deleteJob = async(id)=>{

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job?"
      );

    if(!confirmDelete) return;

    try{

      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`
      );

      fetchJobs();

    }

    catch(error){

      console.log(error);

    }

  };

  const saveJob = async()=>{

    try{

      await axios.put(

        `http://localhost:5000/api/jobs/${editingJob._id}`,

        editingJob

      );

      setEditingJob(null);

      fetchJobs();

    }

    catch(error){

      console.log(error);

    }

  };

  return(

    <div className="admin-page">

      <h1>
        Jobs Management
      </h1>

      <div className="job-grid">

        {

          jobs.map(job=>(

            <div
              key={job._id}
              className="job-card"
            >
<h2>
  {job.title}
</h2>

<p>
  🏢 {job.company}
</p>

<p>
  📍 {job.location}
</p>

<p>
  💰 ₹{job.salary}
</p>

<p>
  💼 {job.jobType}
</p>

<p>
  Skills:
  {" "}
  {job.skills?.join(", ")}
</p>

<p>
  Deadline:
  {" "}
  {
    new Date(
      job.deadline
    ).toLocaleDateString()
  }
</p>

<div className="job-stats">

  <div className="stat-item applications">

    <span>
      Applications
    </span>

    <strong>

      {

        applications.filter(

          app =>

            app.jobId === job._id

        ).length

      }

    </strong>

  </div>

  <div className="stat-item shortlisted">

    <span>
      Shortlisted
    </span>

    <strong>

      {

        applications.filter(

          app =>

            app.jobId === job._id &&

            app.status === "Shortlisted"

        ).length

      }

    </strong>

  </div>

  <div className="stat-item interviews">

    <span>
      Interviews
    </span>

    <strong>

      {

        applications.filter(

          app =>

            app.jobId === job._id &&

            app.status ===
            "Interview Scheduled"

        ).length

      }

    </strong>

  </div>

  <div className="stat-item selected">

    <span>
      Selected
    </span>

    <strong>

      {

        applications.filter(

          app =>

            app.jobId === job._id &&

            app.status === "Selected"

        ).length

      }

    </strong>

  </div>

</div>
<div className="action-row">

  <button

    className={
      job.isPaused
      ?
      "resume-btn"
      :
      "pause-btn"
    }

    onClick={async()=>{

      const confirmAction =
        window.confirm(

          job.isPaused

          ?

          "Are you sure you want to resume this job?"

          :

          "Are you sure you want to pause this job?"

        );

      if(!confirmAction) return;

      try{

        await axios.put(

          `http://localhost:5000/api/jobs/${job._id}`,

          {
            isPaused:
            !job.isPaused
          }

        );

        fetchJobs();

      }

      catch(error){

        console.log(error);

      }

    }}

  >

    {
      job.isPaused
      ?
      "Resume Job"
      :
      "Pause Job"
    }

  </button>

  <button

    className="delete-btn"

    onClick={()=>
      deleteJob(job._id)
    }

  >

    Delete

  </button>

</div>
            </div>

          ))

        }

      </div>

    </div>

  );

}

export default AdminJobs;