import "./AdminCompanies.css";
import { useEffect,useState } from "react";
import axios from "axios";

function AdminCompanies(){

  const [companies,setCompanies] =
    useState([]);

  useEffect(()=>{

    fetchCompanies();

  },[]);

  const fetchCompanies = async()=>{

    try{
  
      const res =
        await axios.get(
          "http://localhost:5000/api/admin/companies"
        );
  
      console.log(res.data);
  
      setCompanies(
        res.data
      );
  
    }
  
    catch(error){
  
      console.log(error);
  
    }
  
  };
  
  const deleteCompany =
    async(id)=>{

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this company?"
        );

      if(!confirmDelete) return;

      await axios.delete(

        `http://localhost:5000/api/admin/company/${id}`

      );

      fetchCompanies();

    };

  return(

    <div className="admin-page">

      <h1>
        Company Management
      </h1>

      <div className="company-grid">

        {

          companies.map(company=>(

            <div
  key={company._id}
  className="company-card"
>

  <h2>
    {company.name}
  </h2>

  <p>
    {company.email}
  </p>

  <p>

    Verification:

    {

      company.isVerified ?

      <span className="verified-badge">
        ✅ Verified
      </span>

      :

      <span className="pending-badge">
        ⏳ Pending
      </span>

    }

  </p>

  <div className="action-row">

    <button

      className={
        company.isVerified
        ?
        "unverify-btn"
        :
        "verify-btn"
      }

      onClick={async()=>{

        const confirmAction =
          window.confirm(

            company.isVerified

            ?

            "Are you sure you want to unverify this company?"

            :

            "Are you sure you want to verify this company?"

          );

        if(!confirmAction) return;

        await axios.put(

          `http://localhost:5000/api/admin/toggle-verification/${company._id}`

        );

        fetchCompanies();

      }}

    >

      {

        company.isVerified

        ?

        "Unverify"

        :

        "Verify"

      }

    </button>

    <button

      className="delete-btn"

      onClick={()=>
        deleteCompany(
          company._id
        )
      }

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

export default AdminCompanies;