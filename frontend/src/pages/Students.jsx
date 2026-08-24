import { useEffect, useState } from "react";

function Students() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filters
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");


  // Fetch students
  const fetchStudents = () => {

    fetch("https://student-management-system-g306.onrender.com/students")
      .then((response) => response.json())
      .then((data) => {

        setStudents(data);
        setLoading(false);

      })
      .catch((error) => {

        console.error("Error:", error);
        setLoading(false);

      });

  };


  useEffect(() => {

    fetchStudents();

  }, []);


  // Delete student
  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `https://student-management-system-g306.onrender.com/students/${id}`,
        {
          method: "DELETE",
        }
      );


      if (response.ok) {

        alert("Student deleted successfully!");

        fetchStudents();

      } else {

        alert("Failed to delete student");

      }

    } catch (error) {

      console.error(error);

      alert("Cannot connect to Flask server");

    }

  };


  // Filter students
  const filteredStudents = students.filter((student) => {

    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText);

    const matchesCourse =
      courseFilter === "" ||
      student.course === courseFilter;

    const matchesYear =
      yearFilter === "" ||
      student.year === yearFilter;

    return (
      matchesSearch &&
      matchesCourse &&
      matchesYear
    );

  });


  // Reset filters
  const resetFilters = () => {

    setSearch("");
    setCourseFilter("");
    setYearFilter("");

  };


  if (loading) {

    return (
      <div className="page-container">

        <h1>Students</h1>

        <p className="page-subtitle">
          Loading students...
        </p>

      </div>
    );

  }


  return (

    <div className="page-container">

      <h1>Students</h1>

      <p className="page-subtitle">
        Manage students stored in the database
      </p>


      {/* SEARCH AND FILTERS */}

      <div className="student-filters">

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >

          <option value="">
            All Courses
          </option>

          <option value="BCA">
            BCA
          </option>

          <option value="B.Tech">
            B.Tech
          </option>

          <option value="MCA">
            MCA
          </option>

          <option value="M.Tech">
            M.Tech
          </option>

        </select>


        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >

          <option value="">
            All Years
          </option>

          <option value="1st Year">
            1st Year
          </option>

          <option value="2nd Year">
            2nd Year
          </option>

          <option value="3rd Year">
            3rd Year
          </option>

          <option value="4th Year">
            4th Year
          </option>

        </select>


        <button
          className="reset-button"
          onClick={resetFilters}
        >
          Reset
        </button>

      </div>


      {/* STUDENT COUNT */}

      <div className="student-count">

        Showing <strong>{filteredStudents.length}</strong>{" "}
        of <strong>{students.length}</strong> students

      </div>


      {/* TABLE */}

      {filteredStudents.length === 0 ? (

        <div className="empty-message">

          No students match your search or filters.

        </div>

      ) : (

        <div className="student-table-container">

          <table className="student-table">

            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>{student.id}</td>

                  <td>{student.name}</td>

                  <td>{student.email}</td>

                  <td>

                    <span className="course-badge">
                      {student.course}
                    </span>

                  </td>

                  <td>{student.year}</td>

                  <td>

                    <button
                      className="edit-button"
                      onClick={() =>
                        window.location.href =
                        `/edit-student/${student.id}`
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteStudent(student.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

export default Students;
