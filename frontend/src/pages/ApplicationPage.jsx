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

  const [job,setJob]=useState(null);
  useEffect(()=>{

    fetchJob();
    
    },[]);
    
    const fetchJob = async()=>{
    
    try{
    
    const res=await axios.get(
    
    `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
    
    );
    
    setJob(res.data);
    
    }
    
    catch(err){
    
    console.log(err);
    
    }
    
    }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    if(

      job &&
      
      Number(formData.cgpa)<Number(job.minCgpa)
      
      ){
      
      alert(
      
      `Minimum CGPA required is ${job.minCgpa}`
      
      );
      
      return;
      
      }

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

      data.append(
        "branch",
        job.branch
        );
        
        data.append(
        "minCgpa",
        job.minCgpa
        );
  
      if (resume) {
  
        data.append(
          "resume",
          resume
        );
  
      }
  
      if(
        !formData.fullName ||
        !formData.email ||
        !formData.cgpa
        ){
        
        alert("Fill all details");
        
        return;
        
        }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications`,
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

        {
job && (

<div className="eligibility-box">

<h3>
Eligibility
</h3>

<p>

🎓 Branch :
{" "}
{job.branch || "All"}
</p>

<p>

📊 Minimum CGPA :
{" "}
{job.minCgpa ?? 0}

</p>

</div>

)
}

        <form onSubmit={handleSubmit}>

          <input
           required
           name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            required
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            required
            name="cgpa"
            placeholder="CGPA"
            onChange={handleChange}
          />

          <input
            required
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />
<label className="resume-label">
  Upload Resume (PDF)
</label>

<input
 required
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
