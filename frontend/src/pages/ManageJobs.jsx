import "./ManageJobs.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res =
        await axios.get(
          "${import.meta.env.VITE_API_URL}/api/jobs"
        );

      const jobsWithApplicants =
        await Promise.all(

          res.data.map(async(job)=>{

            try{

              const apps =
                await axios.get(

                  `${import.meta.env.VITE_API_URL}/api/applications/job/${job._id}`

                );

              return {

                ...job,

                applicants:
                  apps.data.length

              };

            }

            catch{

              return {

                ...job,

                applicants:0

              };

            }

          })

        );

      setJobs(
        jobsWithApplicants
      );

    }

    catch(error){

      console.log(error);

    }

  };

  return(

    <div className="manage-page">

      <div className="manage-header">

        <h1>
          Manage Jobs
        </h1>

        <p>
          View and manage all active jobs
        </p>

      </div>

      <div className="jobs-grid">

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

                {

                  job.skills?.join(", ")

                }

              </p>

              <p>

                Deadline:

                {

                  new Date(
                    job.deadline
                  ).toLocaleDateString()

                }

              </p>

              <div className="job-stats">

                <div className="stat-card applicants">

                  <span>
                    Applicants
                  </span>

                  <strong>
                    {job.applicants}
                  </strong>

                </div>

                <div className="stat-card shortlisted">

                  <span>
                    Shortlisted
                  </span>

                  <strong>
                    {job.shortlisted || 0}
                  </strong>

                </div>

              </div>

              <button

                className="open-btn"

                onClick={()=>

                  navigate(

                    `/job/${job._id}`

                  )

                }

              >

                Open

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default ManageJobs;