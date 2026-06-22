import "./SmartSearch.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SmartSearch() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skill, setSkill] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/jobs`
      );

      setJobs(res.data);
      setFilteredJobs(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const handleSearch = () => {

    let results = [...jobs];

    if (title) {

      results = results.filter(
        job =>
          job.title.toLowerCase()
          .includes(title.toLowerCase())
      );

    }

    if (company) {

      results = results.filter(
        job =>
          job.company.toLowerCase()
          .includes(company.toLowerCase())
      );

    }

    if (skill) {

      results = results.filter(
        job =>
          job.skills.join(" ")
            .toLowerCase()
            .includes(skill.toLowerCase())
      );

    }

    if (salary) {

      results = results.filter(
        job =>
          Number(job.salary) >= Number(salary)
      );

    }

    setFilteredJobs(results);

  };

  return (

    <div className="smart-search-page">

      <h1>
        🔍 Smart Job Search
      </h1>

      <div className="search-container">

        <div className="input-box">

          <label>
            Job Title
          </label>

          <input
            type="text"
            placeholder="Java Developer"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        <div className="input-box">

          <label>
            Company
          </label>

          <input
            type="text"
            placeholder="Infosys"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
          />

        </div>

        <div className="input-box">

          <label>
            Skills
          </label>

          <input
            type="text"
            placeholder="React"
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
          />

        </div>

        <div className="input-box">

          <label>
            Minimum Salary
          </label>

          <input
            type="number"
            placeholder="50000"
            value={salary}
            onChange={(e) =>
              setSalary(e.target.value)
            }
          />

        </div>

      </div>

      <button
        className="search-btn"
        onClick={handleSearch}
      >
        Find Jobs
      </button>

      <div className="search-grid">

        {

          filteredJobs.length === 0 ?

            <div className="empty-results">

              No results found...

            </div>

            :

            filteredJobs.map(job => (

              <div
                className="search-card"
                key={job._id}
              >

                <h2>
                  {job.title}
                </h2>

                <p>
                  🏢 {job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💰 ₹{job.salary}
                </p>

                <p>
                  💼 {job.jobType}
                </p>

                <div className="skill-tags">

                  {

                    job.skills.map((skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    ))

                  }

                </div>

                <button
                  className="apply-btn"
                  onClick={() =>
                    navigate(`/apply/${job._id}`)
                  }
                >

                  Apply

                </button>

              </div>

            ))

        }

      </div>

    </div>

  );

}

export default SmartSearch;