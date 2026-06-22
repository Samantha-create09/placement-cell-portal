import "./AdminApplications.css";
import { useEffect,useState } from "react";
import axios from "axios";

function AdminApplications(){

  const [applications,setApplications] =
    useState([]);

  useEffect(()=>{

    fetchApplications();

  },[]);

  const fetchApplications = async()=>{

    try{

      const appsRes =
        await axios.get(
          "${import.meta.env.VITE_API_URL}/api/applications"
        );

      const jobsRes =
        await axios.get(
          "${import.meta.env.VITE_API_URL}/api/jobs"
        );

      const jobs =
        jobsRes.data;

      const enrichedApps =
        appsRes.data.map(app=>{

          const job =
            jobs.find(

              j =>
              j._id === app.jobId

            );

          return{

            ...app,

            jobTitle:
              job?.title || "Unknown Job",

            companyName:
              job?.company || "Unknown Company"

          };

        });

      setApplications(
        enrichedApps
      );

    }

    catch(error){

      console.log(error);

    }

  };

  const deleteApplication =
  async(id)=>{

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this application?"

      );

    if(!confirmDelete) return;

    try{

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/admin/application/${id}`

      );

      fetchApplications();

    }

    catch(error){

      console.log(error);

    }

  };

  return(

    <div className="admin-page">

      <h1>
        Applications Management
      </h1>

      <div className="application-grid">

        {

          applications.map(app=>(

            <div
              key={app._id}
              className="application-card"
            >

              <h2>
                {app.fullName}
              </h2>

              <span
                className="status-badge"
              >
                {app.status}
              </span>
              <h3>
              <p>

                <strong>
                  Job:
                </strong>

                {" "}

                {app.jobTitle}

              </p>
              </h3>
              <h3>
              <p>

                <strong>
                  Company:
                </strong>

                {" "}

                {app.companyName}

              </p>
             </h3>
              <p>

                <strong>
                  Email:
                </strong>

                {" "}

                {app.email}

              </p>

              <p>

                <strong>
                  CGPA:
                </strong>

                {" "}

                {app.cgpa}

              </p>

              <p>

                <strong>
                  Skills:
                </strong>

                {" "}

                {app.skills?.join(", ")}

              </p>

              <p>

                <strong>
                  Applied:
                </strong>

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

                  href={
                    `${import.meta.env.VITE_API_URL}${app.resume}`
                  }

                  target="_blank"

                  rel="noreferrer"

                  className="resume-btn"

                >

                  View Resume

                </a>

              }

              {

                app.interviewDate &&

                <div
                  className="interview-box"
                >

                  <p>

                    📅
                    {" "}
                    {app.status}

                  </p>

                  <p>

                    Date:
                    {" "}

                    {app.interviewDate}

                  </p>

                  {

                    app.meetingLink &&

                    <a

                      href={app.meetingLink}

                      target="_blank"

                      rel="noreferrer"

                      className="meeting-btn"

                    >

                      View Meeting Link

                    </a>

                  }

                </div>

              }

              <button

                className="delete-btn"

                onClick={()=>

                  deleteApplication(
                    app._id
                  )

                }

              >

                Delete

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default AdminApplications;