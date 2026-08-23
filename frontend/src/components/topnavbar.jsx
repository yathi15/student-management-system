import { Link } from "react-router-dom";

function TopNavbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "72px",
        background: "linear-gradient(90deg, #1d4ed8, #2563eb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 45px",
        boxSizing: "border-box",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "700",
          whiteSpace: "nowrap",
        }}
      >
        Student Management System
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/students"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          Students
        </Link>

        <Link
          to="/add-student"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          Add Student
        </Link>
      </div>
    </nav>
  );
}

export default TopNavbar;