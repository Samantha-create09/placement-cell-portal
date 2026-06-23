import "./SmartSearch.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SmartSearch() {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [jobType,setJobType] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortBy,setSortBy] = useState("");

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skill, setSkill] = useState("");
  const [salary, setSalary] = useState("");
const [cgpa,setCgpa]=useState("");
const [branch,setBranch]=useState("");

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

    if (cgpa) {

        results = results.filter(
          job =>
            Number(job.minCgpa || 0) <= Number(cgpa)
        );
      
      }
      
      if (branch) {
      
        results = results.filter(
          job =>
            job.branch === "All" ||
            job.branch === branch
        );
      
      }
      
    if (salary) {

      results = results.filter(
        job =>
          Number(job.salary) >= Number(salary)
      );

    }

    if(jobType){

        results = results.filter(
        
        job =>
        
        job.jobType === jobType
        
        );
        
        }

        

        if(sortBy==="salary"){

            results.sort(
            (a,b)=>
            Number(b.salary)-Number(a.salary)
            );
            
            }

            if(sortBy==="newest"){

                results.sort(
                
                (a,b)=>
                
                new Date(b.createdAt)-new Date(a.createdAt)
                
                );
                
                }

                if(sortBy==="deadline"){

                    results.sort(
                    
                    (a,b)=>
                    
                    new Date(a.deadline)-new Date(b.deadline)
                    
                    );
                    
                    }

                    if(sortBy==="match"){

                        results.sort(
                        
                        (a,b)=>
                        
                        b.skills.length-a.skills.length
                        
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

        <div className="input-box">

<label>
Job Type
</label>

<select
value={jobType}
onChange={(e)=>setJobType(e.target.value)}
>

<option value="">
All Types
</option>

<option value="Full Time">
Full Time
</option>

<option value="Internship">
Internship
</option>

<option value="Part Time">
Part Time
</option>

</select>

</div>

<select
value={branch}
onChange={(e)=>setBranch(e.target.value)}
>

<option value="">
All Branches
</option>

<option value="BSc Computer Science">
BSc Computer Science
</option>

<option value="MSc Computer Science">
MSc Computer Science
</option>

<option value="BCA">
BCA
</option>

<option value="MCA">
MCA
</option>

<option value="BTech">
BTech
</option>

<option value="MTech">
MTech
</option>

<option value="BE">
BE
</option>

<option value="ME">
ME
</option>

</select>

<input
type="number"
placeholder="Minimum CGPA"
value={cgpa}
onChange={(e)=>setCgpa(e.target.value)}
/>

<div className="input-box">

<label>
Sort By
</label>

<select
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}
>

<option value="">
None
</option>

<option value="newest">
Newest
</option>

<option value="salary">
Highest Salary
</option>

<option value="deadline">
Deadline
</option>

<option value="match">
Best Match
</option>

</select>

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

                <p>

                <p>

 <p>
  Skills:
  {" "}
  {job.skills?.join(", ")}
</p>

🎓 Branch :
{" "}
{job.branch || "All"}
</p>

<p>

📊 Minimum CGPA :
{" "}
{job.minCgpa ?? 0}
</p>        

📅 Deadline :

{

new Date(job.deadline)

.toLocaleDateString()

}

</p>


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