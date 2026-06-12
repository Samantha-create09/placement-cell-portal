import "./ManageJobs.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageJobs() {

  const navigate = useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const [selectedJob,
    setSelectedJob] =
    useState(null);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/jobs"
        );

      const jobsWithApplicants =
        await Promise.all(

          res.data.map(async(job)=>{

            try{

              const apps =
                await axios.get(
                  `http://localhost:5000/api/applications/job/${job._id}`
                );

              return {

                ...job,

                applicants:
                  apps.data.length

              };

            }catch{

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

      if(
        jobsWithApplicants.length
      ){

        setSelectedJob(
          jobsWithApplicants[0]
        );

      }

    } catch(err){

      console.log(err);

    }

  };

  return (

    <div className="manage-page">

      <div className="left-panel">

        <div className="panel-header">

          <h1>
            Manage Jobs
          </h1>

          <p>
            View and manage
            all active jobs
          </p>

        </div>

        {

          jobs.map(job => (

            <div

              key={job._id}

              className={
                selectedJob?._id ===
                job._id

                ?

                "job-card active"

                :

                "job-card"
              }

              onClick={()=>
                setSelectedJob(job)
              }
            >

              <h3>
                {job.title}
              </h3>

              <p>
                {job.company}
              </p>

              <div className="job-meta">

                <span>
                  👥
                  {job.applicants}
                </span>

                <span>
                  ⭐
                  {job.shortlisted || 0}
                </span>

              </div>

              <small>

                Posted:
                {" "}
                {

                  new Date(
                    job.createdAt
                  ).toLocaleDateString()

                }

              </small>

            </div>

          ))

        }

      </div>

      <div className="right-panel">

        {

          selectedJob && (

            <>

              <div className="job-banner">

                <div>

                  <h1>
                    {
                      selectedJob.title
                    }
                  </h1>

                  <p>
                    {
                      selectedJob.company
                    }
                  </p>

                </div>

                <button

                  onClick={() =>
                    navigate(
                      `/job/${selectedJob._id}`
                    )
                  }

                  className="view-btn"
                >
                  View Applications
                </button>

              </div>

              <div className="details-grid">

                <div className="detail-box">

                  <h4>
                    Location
                  </h4>

                  <p>
                    {
                      selectedJob.location
                    }
                  </p>

                </div>

                <div className="detail-box">

                  <h4>
                    Salary
                  </h4>

                  <p>
                    ₹
                    {
                      selectedJob.salary
                    }
                  </p>

                </div>

                <div className="detail-box">

                  <h4>
                    Applicants
                  </h4>

                  <p>
                    {
                      selectedJob.applicants
                    }
                  </p>

                </div>

                <div className="detail-box">

                  <h4>
                    Shortlisted
                  </h4>

                  <p>
                    {
                      selectedJob.shortlisted || 0
                    }
                  </p>

                </div>

              </div>

              <div className="description-box">

                <h3>
                  Description
                </h3>

                <p>
                  {
                    selectedJob.description
                  }
                </p>

              </div>

            </>

          )

        }

      </div>

    </div>

  );

}

export default ManageJobs;