function DashboardLayout({ children }) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        
        <div
          style={{
            width: "250px",
            background: "#1e293b",
            color: "white",
            padding: "20px"
          }}
        >
          <h2>Placement Portal</h2>
  
          <hr />
  
          <p>Dashboard</p>
          <p>Jobs</p>
          <p>Applications</p>
          <p>Profile</p>
        </div>
  
        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f8fafc"
          }}
        >
          {children}
        </div>
  
      </div>
    );
  }
  
  export default DashboardLayout;