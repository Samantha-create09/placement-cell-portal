import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./ApplicationPage.css";

function ApplicationPage() {
  const { id } = useParams();
  const [resume, setResume] =
  useState(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({

    studentId: user.id,

    jobId: id,
  
    fullName: "",
  
    email: "",
  
    cgpa: "",
  
    skills: ""
  
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
  
      const data = new FormData();
  
      data.append(
        "jobId",
        formData.jobId
      );
  
      data.append(
        "fullName",
        formData.fullName
      );
  
      data.append(
        "email",
        formData.email
      );
  
      data.append(
        "cgpa",
        formData.cgpa
      );
  
      data.append(
        "skills",
        formData.skills
      );
  
      if (resume) {
  
        data.append(
          "resume",
          resume
        );
  
      }
  
      await axios.post(
        '${import.meta.env.VITE_API_URL}/api/applications',
        data,
        {
          headers: {
            "Content-Type":
            "multipart/form-data"
          }
        }
      );
  
      alert(
        "Application Submitted"
      );
  
    } catch (error) {
  
      console.log(error);
  
      alert(
        "Application failed"
      );
  
    }
  
  };
  return (
    <div className="application-page">

      <div className="application-card">

        <h1>Apply For Job</h1>

        <form onSubmit={handleSubmit}>

          <input
           name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="cgpa"
            placeholder="CGPA"
            onChange={handleChange}
          />

          <input
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />
<label className="resume-label">
  Upload Resume (PDF)
</label>

<input
  type="file"
  accept=".pdf"
  onChange={(e) =>
    setResume(
      e.target.files[0]
    )
  }
/>
          <button type="submit">
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
}

export default ApplicationPage;
