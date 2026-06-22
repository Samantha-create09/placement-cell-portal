import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStudents.css";


function AdminStudents() {

  const [students,setStudents] =
  useState([]);

  useEffect(()=>{

    fetchStudents();

  },[]);

  const fetchStudents = async()=>{

    try{

      const res =
      await axios.get(
        '${import.meta.env.VITE_API_URL}/api/students'
      );

      setStudents(res.data);

    }
    catch(err){

      console.log(err);

    }

  };

  const deleteStudent = async(id)=>{

    try{

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/student/${id}`
      );

      fetchStudents();

    }
    catch(err){

      console.log(err);

    }

  };

  return(

    <div className="admin-page">

      <h1>
        Students Management
      </h1>

      <div className="admin-grid">

        {
          students.map(student=>(

            <div
              className="admin-card"
              key={student._id}
            >

<>

<h2>
  {student.name}
</h2>

<p className="student-email">
  {student.email}
</p>

</>

              <p>
                Skills:
                {" "}
                {
                  student.skills?.join(", ")
                }
              </p>

              {
  student.resumeUrl && (

    <a
      href={
        `${import.meta.env.VITE_API_URL}/uploads/${student.resumeUrl}`
      }
      target="_blank"
      rel="noreferrer"
      className="resume-btn"
    >
      View Resume
    </a>

  )
}
              <p>
  <strong>Role:</strong>
  {" "}
  {student.role}
</p>

<div className="verification-row">

  <span>

    <strong>
      Verification:
    </strong>

  </span>

  {

    student.isVerified ?

    <span className="verified-badge">

      Verified

    </span>

    :

    <span className="pending-badge">

      Pending

    </span>

  }

</div>

<div className="action-row">

<button

  className={
    student.isVerified

    ?

    "unverify-btn"

    :

    "verify-btn"
  }

  onClick={async()=>{

    const confirmAction =
      window.confirm(
  
        student.isVerified
  
        ?
  
        "Are you sure you want to unverify this student?"
  
        :
  
        "Are you sure you want to verify this student?"
  
      );
  
    if(!confirmAction) return;
  
    await axios.put(
  
      `${import.meta.env.VITE_API_URL}/api/admin/toggle-verification/${student._id}`
  
    );
  
    fetchStudents();
  
  }}

>

  {

    student.isVerified

    ?

    "Unverify"

    :

    "Verify"

  }

</button>

<button
  className="delete-btn"
  onClick={()=>{

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this student?"

      );

    if(confirmDelete){

      deleteStudent(
        student._id
      );

    }

  }}
>
  Delete
</button>

</div>
            </div>

          ))
        }

      </div>

    </div>

  );

}

export default AdminStudents;