import "./Jobs.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/jobs`
      );

      setJobs(res.data);

    } catch(err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchJobs();

  }, []);

  return (

    <div className="jobs-page">

      <h1>Available Jobs</h1>

      <div className="job-list">

        {jobs.map((job) => (

          
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
  Skills:
  {" "}
  {job.skills?.join(", ")}
</p>

<p>
🎓 Eligible Branch :
{" "}
{job.branch || "All"}
</p>

<p>
📊 Minimum CGPA :
{" "}
{job.minCgpa ?? 0}
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

        ))}

      </div>

    </div>

  );

}

export default Jobs;