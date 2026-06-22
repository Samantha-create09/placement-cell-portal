import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PostJob() {
const navigate = useNavigate();
const { user } = useAuth();
  const [job,setJob] = useState({
    
    title:"",
    company:"",
    location:"",
    salary:"",
    jobType:"",
    skills:"",
    description:"",
    deadline:""

  });

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]:e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      await axios.post(
  '${import.meta.env.VITE_API_URL}/api/jobs',
  {

    ...job,

    createdBy:user.id

  }
);

alert("Job Created");

navigate("/company-dashboard");

    }catch(err){

      console.log(err);

    }
  };

  return(

    <div className="page-container">

      <h1>Post New Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        />

        <input
          name="jobType"
          placeholder="Full Time / Internship"
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="React,Node,MongoDB"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="date"
          name="deadline"
          onChange={handleChange}
        />

        <button type="submit">
          Create Job
        </button>

      </form>

    </div>
  );

}

export default PostJob;