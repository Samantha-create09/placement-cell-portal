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
        "${import.meta.env.VITE_API_URL}/api/jobs"
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
            key={job._id}
            className="job-card"
          >

            <h2>{job.title}</h2>

            <p>{job.company}</p>

            <p>{job.location}</p>

            <button
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