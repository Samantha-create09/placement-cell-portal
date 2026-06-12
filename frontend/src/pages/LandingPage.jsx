import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🎓 PlacementPro</div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Connecting Talent.<br />
            Creating Opportunities.
          </h1>

          <p>
            PlacementPro is a full-stack placement portal that connects students,
            companies, and recruiters in one system.
          </p>

          <div className="hero-buttons">
            <Link to="/register">
              <button className="primary-btn">Get Started</button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="hero-cards">
          <div className="card">🎓 Students</div>
          <div className="card">🏢 Companies</div>
          <div className="card">📊 Analytics</div>
          <div className="card">👨‍🏫 Mentors</div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card"><h2>500+</h2><p>Students</p></div>
        <div className="stat-card"><h2>120+</h2><p>Companies</p></div>
        <div className="stat-card"><h2>95%</h2><p>Placement Rate</p></div>
        <div className="stat-card"><h2>1200+</h2><p>Applications</p></div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why PlacementPro?</h2>

        <div className="grid">
          <div className="feature-card">🎓 Student Portal</div>
          <div className="feature-card">🏢 Company Hiring</div>
          <div className="feature-card">👨‍🏫 Mentor System</div>
          <div className="feature-card">📊 Analytics</div>
          <div className="feature-card">📄 Applications</div>
          <div className="feature-card">🔒 Secure Login</div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;