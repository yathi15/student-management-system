import { useState } from "react";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      alert("Please enter student name");
      return;
    }

    // Validate email
    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate course
    if (!course) {
      alert("Please select a course");
      return;
    }

    // Validate year
    if (!year) {
      alert("Please select a year");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            course: course,
            year: year,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Student added successfully!");

        // Clear form
        setName("");
        setEmail("");
        setCourse("");
        setYear("");
      } else {
        alert(data.message || "Failed to add student");
      }
    } catch (error) {
      console.error("Error:", error);

      alert("Cannot connect to Flask server");
    }
  };

  return (
    <main className="page-container add-student-page">
      <div className="form-card">

        <h1>Add Student</h1>

        <p className="page-subtitle">
          Enter student details below
        </p>

        <form onSubmit={handleSubmit}>

          {/* Student Name */}
          <div className="form-group">
            <label htmlFor="name">
              Student Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          {/* Course */}
          <div className="form-group">
            <label htmlFor="course">
              Course
            </label>

            <select
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">
                Select Course
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
          </div>


          {/* Year */}
          <div className="form-group">
            <label htmlFor="year">
              Year
            </label>

            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">
                Select Year
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
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="add-student-button"
          >
            Add Student
          </button>

        </form>
      </div>
    </main>
  );
}

export default AddStudent;