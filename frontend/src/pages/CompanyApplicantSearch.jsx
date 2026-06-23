import "./CompanyApplicantSearch.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CompanyApplicantSearch(){

const [applications,setApplications]=useState([]);
const [filtered,setFiltered]=useState([]);

const [jobTitle,setJobTitle]=useState("");
const [skill,setSkill]=useState("");
const [cgpa,setCgpa]=useState("");
const [branch,setBranch]=useState("");

useEffect(()=>{

fetchApplications();

},[]);

const fetchApplications=async()=>{

try{

const res=await axios.get(
`${import.meta.env.VITE_API_URL}/api/applications`
);

setApplications(res.data);
setFiltered(res.data);

}

catch(err){

console.log(err);

}

};

const handleSearch=()=>{

let results=[...applications];

if(jobTitle){

results=results.filter(

app=>

app.jobTitle?.toLowerCase()
.includes(jobTitle.toLowerCase())

);

}

if(skill){

results=results.filter(

app=>

Array.isArray(app.skills)

?

app.skills.join(" ")
.toLowerCase()
.includes(skill.toLowerCase())

:

app.skills?.toLowerCase()
.includes(skill.toLowerCase())

);

}

if(cgpa){

results=results.filter(

app=>

Number(app.cgpa)>=Number(cgpa)

);

}

if(branch){

results=results.filter(

app=>

app.branch==="All"

||

app.branch===branch

);

}

setFiltered(results);

};

return(

<div className="company-search-page">

<h1>Applicant Smart Search</h1>

<div className="search-box">

<input
placeholder="Job Title"
value={jobTitle}
onChange={(e)=>setJobTitle(e.target.value)}
/>

<input
placeholder="Skills"
value={skill}
onChange={(e)=>setSkill(e.target.value)}
/>

<input
type="number"
placeholder="Minimum CGPA"
value={cgpa}
onChange={(e)=>setCgpa(e.target.value)}
/>

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

<option value="BE">
BE
</option>

<option value="ME">
ME
</option>

<option value="BTech">
BTech
</option>

<option value="MTech">
MTech
</option>

</select>

<button
className="find-btn"
onClick={handleSearch}
>

Find Applicants

</button>

</div>

<div className="cards">

{

filtered.length===0

?

<p className="empty">
No applicants found
</p>

:

filtered.map(app=>(

<div
className="app-card"
key={app._id}
>

<div className="left">

<h3>
{app.fullName}
</h3>

<p>
{app.email}
</p>

<p>

CGPA :

{app.cgpa}

</p>

<p>

Branch :

{app.branch}

</p>

<p>

Skills :

{

Array.isArray(app.skills)

?

app.skills.join(", ")

:

app.skills

}

</p>

</div>

<div className="right">

{

app.resume &&

<a
href={`${import.meta.env.VITE_API_URL}${app.resume}`}
target="_blank"
rel="noreferrer"
className="resume-btn"
>

View Resume

</a>

}

<div className="status">

{app.status}

</div>

</div>

</div>

))

}

</div>

</div>

);

}

export default CompanyApplicantSearch;