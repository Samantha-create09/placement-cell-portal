import "./SmartSearch.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SmartSearch() {

const navigate = useNavigate();

const [jobs,setJobs]=useState([]);
const [filteredJobs,setFilteredJobs]=useState([]);

const [search,setSearch]=useState("");
const [location,setLocation]=useState("");
const [jobType,setJobType]=useState("");

useEffect(()=>{

fetchJobs();

},[]);

const fetchJobs=async()=>{

try{

const res=await axios.get(
`${import.meta.env.VITE_API_URL}/api/jobs`
);

setJobs(res.data);
setFilteredJobs(res.data);

}

catch(error){

console.log(error);

}

};

useEffect(()=>{

let results=[...jobs];

if(search){

results=results.filter(job=>

job.title.toLowerCase().includes(search.toLowerCase())

||

job.company.toLowerCase().includes(search.toLowerCase())

||

job.skills.join(" ").toLowerCase().includes(search.toLowerCase())

);

}

if(location){

results=results.filter(

job=>

job.location.toLowerCase().includes(location.toLowerCase())

);

}

if(jobType){

results=results.filter(

job=>job.jobType===jobType

);

}

setFilteredJobs(results);

},[search,location,jobType,jobs]);

return(

<div className="smart-search-page">

<h1>
🔍 Smart Job Search
</h1>

<div className="search-filters">

<input
type="text"
placeholder="Search title, company or skill..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<input
type="text"
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

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

<div className="search-grid">

{

filteredJobs.map(job=>(

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

job.skills.map((skill,index)=>(

<span key={index}>
{skill}
</span>

))

}

</div>

<button
className="apply-btn"
onClick={()=>
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