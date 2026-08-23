from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)


# =========================================================
# DATABASE CONFIGURATION
# =========================================================

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///students.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================================================
# STUDENT DATABASE TABLE
# =========================================================

class Student(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(100),
        nullable=False
    )

    course = db.Column(
        db.String(50),
        nullable=False
    )

    year = db.Column(
        db.String(20),
        nullable=False
    )


# =========================================================
# USER DATABASE TABLE
# =========================================================

class User(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )


# =========================================================
# CREATE DATABASE AND TABLES
# =========================================================

with app.app_context():
    db.create_all()


# =========================================================
# HOME / TEST ROUTE
# =========================================================

@app.route("/")
def home():

    return jsonify({
        "message": "Student Management System API is running"
    })


# =========================================================
# GET ALL STUDENTS
# =========================================================

@app.route("/students", methods=["GET"])
def get_students():

    students = Student.query.all()

    result = []

    for student in students:

        result.append({
            "id": student.id,
            "name": student.name,
            "email": student.email,
            "course": student.course,
            "year": student.year
        })

    return jsonify(result)


# =========================================================
# ADD STUDENT
# =========================================================

@app.route("/students", methods=["POST"])
def add_student():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "No data received"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    course = data.get("course", "").strip()
    year = data.get("year", "").strip()

    if not name or not email or not course or not year:
        return jsonify({
            "message": "All fields are required"
        }), 400

    # Check duplicate email
    existing_student = Student.query.filter_by(
        email=email
    ).first()

    if existing_student:

        return jsonify({
            "message": "A student with this email already exists"
        }), 400

    new_student = Student(
        name=name,
        email=email,
        course=course,
        year=year
    )

    db.session.add(new_student)
    db.session.commit()

    return jsonify({
        "message": "Student added successfully",
        "id": new_student.id
    }), 201


# =========================================================
# DELETE STUDENT
# =========================================================

@app.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):

    student = Student.query.get(student_id)

    if not student:

        return jsonify({
            "message": "Student not found"
        }), 404

    db.session.delete(student)
    db.session.commit()

    return jsonify({
        "message": "Student deleted successfully"
    })


# =========================================================
# UPDATE STUDENT
# =========================================================

@app.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):

    student = Student.query.get(student_id)

    if not student:

        return jsonify({
            "message": "Student not found"
        }), 404

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "No data received"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    course = data.get("course", "").strip()
    year = data.get("year", "").strip()

    if not name or not email or not course or not year:

        return jsonify({
            "message": "All fields are required"
        }), 400

    # Check duplicate email
    existing_student = Student.query.filter_by(
        email=email
    ).first()

    if existing_student and existing_student.id != student_id:

        return jsonify({
            "message": "Another student already uses this email"
        }), 400

    student.name = name
    student.email = email
    student.course = course
    student.year = year

    db.session.commit()

    return jsonify({
        "message": "Student updated successfully"
    })


# =========================================================
# DASHBOARD STATISTICS
# =========================================================

@app.route("/dashboard", methods=["GET"])
def dashboard():

    total_students = Student.query.count()

    bca = Student.query.filter_by(
        course="BCA"
    ).count()

    btech = Student.query.filter_by(
        course="B.Tech"
    ).count()

    mca = Student.query.filter_by(
        course="MCA"
    ).count()

    mtech = Student.query.filter_by(
        course="M.Tech"
    ).count()

    if total_students > 0:

        bca_percentage = round(
            (bca / total_students) * 100,
            1
        )

        btech_percentage = round(
            (btech / total_students) * 100,
            1
        )

        mca_percentage = round(
            (mca / total_students) * 100,
            1
        )

        mtech_percentage = round(
            (mtech / total_students) * 100,
            1
        )

    else:

        bca_percentage = 0
        btech_percentage = 0
        mca_percentage = 0
        mtech_percentage = 0

    return jsonify({

        "total_students": total_students,

        "courses": {

            "BCA": {
                "students": bca,
                "percentage": bca_percentage
            },

            "B.Tech": {
                "students": btech,
                "percentage": btech_percentage
            },

            "MCA": {
                "students": mca,
                "percentage": mca_percentage
            },

            "M.Tech": {
                "students": mtech,
                "percentage": mtech_percentage
            }
        }
    })


# =========================================================
# LOGIN
# =========================================================

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "No data received"
        }), 400

    username = data.get(
        "username",
        ""
    ).strip()

    password = data.get(
        "password",
        ""
    )

    if not username or not password:

        return jsonify({
            "message": "Username and password are required"
        }), 400

    # Find user in database
    user = User.query.filter_by(
        username=username
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid username or password"
        }), 401

    # Check hashed password
    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "message": "Invalid username or password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "username": user.username
    }), 200


# =========================================================
# START FLASK SERVER
# =========================================================

if __name__ == "__main__":

    app.run(debug=True)
