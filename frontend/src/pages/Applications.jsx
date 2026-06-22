import "./Applications.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Applications() {

  const { user } = useAuth();

  const [applications,
    setApplications] =
    useState([]);

  useEffect(() => {

    if (user?.email) {

      fetchApplications();

    }

  }, [user]);

  const fetchApplications =
    async () => {

      try {

        const res =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/applications/student/${user.email}`

          );

        setApplications(
          res.data
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="applications-page">

      <h1>
        My Applications
      </h1>

      {

        applications.length === 0 ?

          (

            <div className="application-card">

              <h3>
                No applications yet
              </h3>

              <p>
                Applied jobs will appear here.
              </p>

            </div>

          )

          :

          applications.map(app => (

            <div
  className="application-card"
  key={app._id}
>

  <div className="application-top">

    <h3>
      {app.fullName}
    </h3>

    <span
      className={
        app.status === "Applied"
        ? "status-pill status-applied"

        : app.status === "Shortlisted"
        ? "status-pill status-shortlisted"

        : app.status === "Selected"
        ? "status-pill status-selected"

        : app.status === "Rejected"
        ? "status-pill status-rejected"

        : "status-pill status-interview"
      }
    >
      {app.status}
    </span>

  </div>

  <div className="application-details">

    <p>
      <strong>Email:</strong>
      {" "}
      {app.email}
    </p>

    <p>
      <strong>CGPA:</strong>
      {" "}
      {app.cgpa}
    </p>

    <p>
      <strong>Skills:</strong>
      {" "}
      {
        Array.isArray(app.skills)
        ? app.skills.join(", ")
        : app.skills
      }
    </p>

    <p>
      <strong>Applied:</strong>
      {" "}
      {
        new Date(
          app.createdAt
        ).toLocaleDateString()
      }
    </p>

  </div>

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

{
  app.interviewDate && (

    <div className="interview-box">

      <h4>
        📅 Interview Scheduled
      </h4>

      <p>

        <strong>Date:</strong>
        {" "}
        {app.interviewDate}

      </p>

      {
        app.meetingLink && (

          <a
            href={app.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="meeting-btn"
          >
            Join Interview
          </a>

        )
      }

    </div>

  )
}

</div>
          ))

      }

    </div>

  );

}

export default Applications;