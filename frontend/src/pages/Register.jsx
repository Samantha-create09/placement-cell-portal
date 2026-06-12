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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {
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

  </>
)}

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

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