import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      if(formData.role !== res.data.user.role){

        alert(
          `This account belongs to ${res.data.user.role}`
        );
      
        return;
      
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // store token + user globally
      login(res.data);

      // ROLE BASED REDIRECT
      const role = res.data.user.role;

      if (role === "student") {
        navigate("/student-dashboard");
      }
      else if (role === "company") {
        navigate("/company-dashboard");
      }
      else if (role === "mentor") {
        navigate("/admin-dashboard");
      }
      else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (err) {

  console.log("FULL ERROR:", err);

  console.log(
    "Response Data:",
    err.response?.data
  );

  alert(
    err.response?.data?.message ||
    err.message ||
    "Login failed"
  );

}
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="auth-left">

        <div className="brand-logo">🎓 PlacementPro</div>

        <h1>Empowering Careers, Connecting Talent.</h1>

        <p>
          A smart campus recruitment platform connecting students,
          companies, mentors and placement coordinators.
        </p>

        <div className="stats-preview">
          <div className="mini-card"><h3>500+</h3><span>Students</span></div>
          <div className="mini-card"><h3>120+</h3><span>Companies</span></div>
          <div className="mini-card"><h3>95%</h3><span>Placement</span></div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to continue</p>

          {/* ROLE */}
          <select
            name="role"
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <div className="forgot-password">
            Forgot Password?
          </div>

          {/* LOGIN BUTTON */}
          <button onClick={handleLogin}>
            Login
          </button>

          <p className="switch-text">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;