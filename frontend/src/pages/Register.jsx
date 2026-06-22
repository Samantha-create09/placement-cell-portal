import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  
    companyName: "",
    industry: "",
    location: "",
    website: ""
  });

  const [companyDocument,setCompanyDocument] =
  useState(null);

  const handleChange = (e) => {

    if(e.target.type === "file"){
  
      setFormData({
  
        ...formData,
  
        [e.target.name]:
        e.target.files[0]
  
      });
  
    }
  
    else{
  
      setFormData({
  
        ...formData,
  
        [e.target.name]:
        e.target.value
  
      });
  
    }
  
  };
  const handleRegister = async () => {

    try {
  
      const data =
        new FormData();
  
      Object.keys(formData)
        .forEach(key=>{
  
          data.append(
            key,
            formData[key]
          );
  
        });
  
      if(
        companyDocument
      ){
  
        data.append(
          "companyDocument",
          companyDocument
        );
  
      }
  
      await axios.post(
  
        "${import.meta.env.VITE_API_URL}/api/auth/register",
  
        data,
  
        {
  
          headers:{
            "Content-Type":
            "multipart/form-data"
          }
  
        }
  
      );
  
      alert(
        "Registration Successful!"
      );
  
      navigate("/login");
  
    }
  
    catch(err){
  
      console.log(err);
  
      alert(
  
        err.response?.data?.message ||
  
        "Registration Failed"
  
      );
  
    }
  
  };

  return (
    <div className="auth-container">

      <div className="auth-left">

        <div className="brand-logo">
          🎓 PlacementPro
        </div>

        <h1>
          Empowering Careers,
          Connecting Talent.
        </h1>

        <p>
          A smart campus recruitment platform
          connecting students, companies,
          mentors and placement coordinators.
        </p>
        
        <div className="stats-preview">
          <div className="mini-card"><h3>500+</h3><span>Students</span></div>
          <div className="mini-card"><h3>120+</h3><span>Companies</span></div>
          <div className="mini-card"><h3>95%</h3><span>Placement</span></div>
        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Register to continue
          </p>

          <select
            name="role"
            onChange={handleChange}
          >
            <option value="">
              Select Role
            </option>

            <option value="student">
              Student
            </option>

            <option value="company">
              Company
            </option>

            <option value="mentor">
              Mentor
            </option>

          </select>

          {formData.role === "company" && (
  <>

    <input
      name="companyName"
      placeholder="Company Name"
      onChange={handleChange}
    />

    <input
      name="industry"
      placeholder="Industry"
      onChange={handleChange}
    />

    <input
      name="location"
      placeholder="Location"
      onChange={handleChange}
    />

    <input
      name="website"
      placeholder="Website"
      onChange={handleChange}
    />

<label className="document-label">

  Company Verification Document

</label>
<p className="document-info">

Upload Any 1 - GST Certificate,
MSME Certificate,
Startup India Certificate,
Corporate Identification Number (CIN) Registration,
Certificate of Incorporation
or Company PAN Card.

</p>
<input
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  onChange={(e)=>
    setCompanyDocument(
      e.target.files[0]
    )
  }
/>

  </>
)}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button onClick={handleRegister}>
            Register
          </button>

          <p className="switch-text">
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;