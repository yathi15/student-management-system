import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://student-management-system-g306.onrender.com/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setError("Cannot connect to Flask server.");
      });
  }, []);

  // Loading
  if (!data && !error) {
    return (
      <main className="dashboard">
        <h1>Dashboard</h1>
        <p className="subtitle">Loading dashboard...</p>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="dashboard">
        <h1>Dashboard</h1>

        <div className="empty-message">
          {error}
          <br />
          <small>
            Make sure the Flask backend is running.
          </small>
        </div>
      </main>
    );
  }

  // Course percentages
  const bca = data.courses.BCA.percentage;
  const btech = data.courses["B.Tech"].percentage;
  const mca = data.courses.MCA.percentage;
  const mtech = data.courses["M.Tech"].percentage;

  // Course student counts
  const bcaStudents = data.courses.BCA.students;
  const btechStudents = data.courses["B.Tech"].students;
  const mcaStudents = data.courses.MCA.students;
  const mtechStudents = data.courses["M.Tech"].students;

  // Pie chart
  const pieStyle = {
    background: `conic-gradient(
      #2563eb 0% ${bca}%,
      #16a34a ${bca}% ${bca + btech}%,
      #f59e0b ${bca + btech}% ${bca + btech + mca}%,
      #dc2626 ${bca + btech + mca}% 100%
    )`,
  };

  return (
    <main className="dashboard">

      {/* Header */}

      <h1>Dashboard</h1>

      <p className="subtitle">
        Student Distribution by Course
      </p>


      {/* Total Students */}

      <div className="total-card">

        <h2>Total Students</h2>

        <h3>{data.total_students}</h3>

        <p>Students Registered</p>

      </div>


      {/* Course Cards */}

      <div className="course-cards">

        {/* BCA */}

        <div className="course-card">

          <h2>BCA</h2>

          <h3>{bca}%</h3>

          <p>
            {bcaStudents}{" "}
            {bcaStudents === 1 ? "Student" : "Students"}
          </p>

        </div>


        {/* B.Tech */}

        <div className="course-card">

          <h2>B.Tech</h2>

          <h3>{btech}%</h3>

          <p>
            {btechStudents}{" "}
            {btechStudents === 1 ? "Student" : "Students"}
          </p>

        </div>


        {/* MCA */}

        <div className="course-card">

          <h2>MCA</h2>

          <h3>{mca}%</h3>

          <p>
            {mcaStudents}{" "}
            {mcaStudents === 1 ? "Student" : "Students"}
          </p>

        </div>


        {/* M.Tech */}

        <div className="course-card">

          <h2>M.Tech</h2>

          <h3>{mtech}%</h3>

          <p>
            {mtechStudents}{" "}
            {mtechStudents === 1 ? "Student" : "Students"}
          </p>

        </div>

      </div>


      {/* Pie Chart */}

      <div className="chart-box">

        <h2>Course Distribution</h2>

        <div
          className="pie-chart"
          style={pieStyle}
        ></div>


        {/* Legend */}

        <div className="legend">

          <span>
            🔵 BCA — {bca}%
          </span>

          <span>
            🟢 B.Tech — {btech}%
          </span>

          <span>
            🟠 MCA — {mca}%
          </span>

          <span>
            🔴 M.Tech — {mtech}%
          </span>

        </div>

      </div>

    </main>
  );
}

export default Dashboard;
