import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {

    fetch(`https://student-management-system-g306.onrender.com/students`)
      .then((response) => response.json())
      .then((data) => {

        const student = data.find(
          (student) => student.id === Number(id)
        );

        if (student) {
          setName(student.name);
          setEmail(student.email);
          setCourse(student.course);
          setYear(student.year);
        }

      });

  }, [id]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedStudent = {
      name,
      email,
      course,
      year
    };

    try {

      const response = await fetch(
        `https://student-management-system-g306.onrender.com/students/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(updatedStudent)
        }
      );

      if (response.ok) {

        alert("Student updated successfully!");

        navigate("/students");

      } else {

        alert("Failed to update student");

      }

    } catch (error) {

      console.error(error);

      alert("Cannot connect to Flask server");

    }
  };


  return (
    <div className="page-container">

      <h1>Edit Student</h1>

      <p className="page-subtitle">
        Update student information
      </p>

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Student Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

        </div>


        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>


        <div className="form-group">

          <label>Course</label>

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >

            <option value="BCA">BCA</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="M.Tech">M.Tech</option>

          </select>

        </div>


        <div className="form-group">

          <label>Year</label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >

            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>

          </select>

        </div>


        <button
          type="submit"
          className="add-button"
        >
          Update Student
        </button>

      </form>

    </div>
  );
}

export default EditStudent;
