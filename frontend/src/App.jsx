import { useEffect, useState } from "react";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;
function App() {
  // =========================
  // NAVIGATION STATE
  // =========================

  const [activeTab, setActiveTab] = useState("students");

  // =========================
  // STUDENT STATE
  // =========================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  // =========================
  // COURSE STATE
  // =========================

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState("");

  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  // =========================
  // ENROLLMENT STATE
  // =========================

  const [enrollments, setEnrollments] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [editingEnrollmentId, setEditingEnrollmentId] = useState(null);

  // =========================
  // FETCH STUDENTS
  // =========================

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/students`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // =========================
  // FETCH COURSES
  // =========================

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/courses`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // =========================
  // FETCH ENROLLMENTS
  // =========================

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/enrollments`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }

      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  // =========================
  // INITIAL DATA LOAD
  // =========================

  useEffect(() => {
    const loadData = async () => {
      try {
        const studentResponse = await fetch(
          `${API_URL}/api/students`
        );

        const courseResponse = await fetch(
          `${API_URL}/api/courses`
        );

        const enrollmentResponse = await fetch(
          `${API_URL}/api/enrollments`
        );

        if (!studentResponse.ok) {
          throw new Error("Failed to fetch students");
        }

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        if (!enrollmentResponse.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const studentData = await studentResponse.json();
        const courseData = await courseResponse.json();
        const enrollmentData = await enrollmentResponse.json();

        setStudents(studentData);
        setCourses(courseData);
        setEnrollments(enrollmentData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // =========================
  // STUDENT CREATE
  // =========================

  const handleAddStudent = async () => {
    // VALIDATION
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      alert("Please fill in all student details.");
      return;
    }

    const student = {
      firstName,
      lastName,
      email,
      phone
    };

    try {
      const response = await fetch(
        `${API_URL}/api/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(student)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      await response.json();

      alert("Student added successfully!");

      clearStudentForm();
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student");
    }
  };

  // =========================
  // STUDENT EDIT
  // =========================

  const handleEditStudent = (student) => {
    setEditingStudentId(student.id);

    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmail(student.email);
    setPhone(student.phone);
  };

  // =========================
  // STUDENT UPDATE
  // =========================

  const handleUpdateStudent = async () => {
    // VALIDATION
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      alert("Please fill in all student details.");
      return;
    }

    const student = {
      firstName,
      lastName,
      email,
      phone
    };

    try {
      const response = await fetch(
        `${API_URL}/api/students/${editingStudentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(student)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      await response.json();

      alert("Student updated successfully!");

      clearStudentForm();
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student");
    }
  };

  // =========================
  // STUDENT DELETE
  // =========================

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/students/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      alert("Student deleted successfully!");

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);

      alert(
        "Failed to delete student. Student may have an enrollment."
      );
    }
  };

  const clearStudentForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setEditingStudentId(null);
  };

  // =========================
  // COURSE CREATE
  // =========================

  const handleAddCourse = async () => {
    // VALIDATION
    if (
      !courseCode.trim() ||
      !courseName.trim() ||
      !description.trim() ||
      !credits.toString().trim()
    ) {
      alert("Please fill in all course details.");
      return;
    }

    const course = {
      courseCode,
      courseName,
      description,
      credits: Number(credits)
    };

    try {
      const response = await fetch(
        `${API_URL}/api/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(course)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      await response.json();

      alert("Course added successfully!");

      clearCourseForm();
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    }
  };

  // =========================
  // COURSE EDIT
  // =========================

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);

    setCourseCode(course.courseCode);
    setCourseName(course.courseName);
    setDescription(course.description);
    setCredits(course.credits);
  };

  // =========================
  // COURSE UPDATE
  // =========================

  const handleUpdateCourse = async () => {
    // VALIDATION
    if (
      !courseCode.trim() ||
      !courseName.trim() ||
      !description.trim() ||
      !credits.toString().trim()
    ) {
      alert("Please fill in all course details.");
      return;
    }

    const course = {
      courseCode,
      courseName,
      description,
      credits: Number(credits)
    };

    try {
      const response = await fetch(
        `${API_URL}/api/courses/${editingCourseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(course)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      await response.json();

      alert("Course updated successfully!");

      clearCourseForm();
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course");
    }
  };

  // =========================
  // COURSE DELETE
  // =========================

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/courses/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      alert("Course deleted successfully!");

      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);

      alert(
        "Failed to delete course. Course may have an enrollment."
      );
    }
  };

  const clearCourseForm = () => {
    setCourseCode("");
    setCourseName("");
    setDescription("");
    setCredits("");
    setEditingCourseId(null);
  };

  // =========================
  // ENROLLMENT CREATE
  // =========================

  const handleAddEnrollment = async () => {
    if (!selectedStudentId || !selectedCourseId) {
      alert("Please select both student and course.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/enrollments?studentId=${selectedStudentId}&courseId=${selectedCourseId}`,
        {
          method: "POST"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create enrollment");
      }

      await response.json();

      alert("Enrollment created successfully!");

      clearEnrollmentForm();
      fetchEnrollments();
    } catch (error) {
      console.error("Error creating enrollment:", error);
      alert("Failed to create enrollment");
    }
  };

  // =========================
  // ENROLLMENT EDIT
  // =========================

  const handleEditEnrollment = (enrollment) => {
    setEditingEnrollmentId(enrollment.id);

    setSelectedStudentId(
      String(enrollment.student.id)
    );

    setSelectedCourseId(
      String(enrollment.course.id)
    );
  };

  // =========================
  // ENROLLMENT UPDATE
  // =========================

  const handleUpdateEnrollment = async () => {
    if (!selectedStudentId || !selectedCourseId) {
      alert("Please select both student and course.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/enrollments/${editingEnrollmentId}?studentId=${selectedStudentId}&courseId=${selectedCourseId}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update enrollment");
      }

      await response.json();

      alert("Enrollment updated successfully!");

      clearEnrollmentForm();
      fetchEnrollments();
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Failed to update enrollment");
    }
  };

  // =========================
  // ENROLLMENT DELETE
  // =========================

  const handleDeleteEnrollment = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/api/enrollments/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete enrollment");
      }

      alert("Enrollment deleted successfully!");

      fetchEnrollments();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment");
    }
  };

  const clearEnrollmentForm = () => {
    setSelectedStudentId("");
    setSelectedCourseId("");
    setEditingEnrollmentId(null);
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="app-container">
      <h1 className="app-title">
        Student Course Management System
      </h1>

      {/* =========================
          NAVIGATION
          ========================= */}

      <div className="nav-tabs">
        <button
          className={
            activeTab === "students"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>

        <button
          className={
            activeTab === "courses"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>

        <button
          className={
            activeTab === "enrollments"
              ? "nav-button active"
              : "nav-button"
          }
          onClick={() => setActiveTab("enrollments")}
        >
          Enrollments
        </button>
      </div>

      {/* =========================
          STUDENTS
          ========================= */}

      {activeTab === "students" && (
        <div className="section-card">
          <h2>
            {editingStudentId === null
              ? "Add Student"
              : "Update Student"}
          </h2>

          <div className="form-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {editingStudentId === null ? (
              <button
                className="primary-button"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
            ) : (
              <>
                <button
                  className="primary-button"
                  onClick={handleUpdateStudent}
                >
                  Update Student
                </button>

                <button
                  className="cancel-button"
                  onClick={clearStudentForm}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <h2 className="table-title">Students</h2>

          {students.length === 0 ? (
            <p className="empty-message">
              No students available.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>

                      <td>
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEditStudent(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteStudent(student.id)
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
      )}

      {/* =========================
          COURSES
          ========================= */}

      {activeTab === "courses" && (
        <div className="section-card">
          <h2>
            {editingCourseId === null
              ? "Add Course"
              : "Update Course"}
          </h2>

          <div className="form-row">
            <input
              type="text"
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />

            {editingCourseId === null ? (
              <button
                className="primary-button"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            ) : (
              <>
                <button
                  className="primary-button"
                  onClick={handleUpdateCourse}
                >
                  Update Course
                </button>

                <button
                  className="cancel-button"
                  onClick={clearCourseForm}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <h2 className="table-title">Courses</h2>

          {courses.length === 0 ? (
            <p className="empty-message">
              No courses available.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Credits</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td>{course.courseCode}</td>
                      <td>{course.courseName}</td>
                      <td>{course.description}</td>
                      <td>{course.credits}</td>

                      <td>
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEditCourse(course)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteCourse(course.id)
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
      )}

      {/* =========================
          ENROLLMENTS
          ========================= */}

      {activeTab === "enrollments" && (
        <div className="section-card">
          <h2>
            {editingEnrollmentId === null
              ? "Create Enrollment"
              : "Update Enrollment"}
          </h2>

          <div className="form-row">
            <select
              value={selectedStudentId}
              onChange={(e) =>
                setSelectedStudentId(e.target.value)
              }
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>

            <select
              value={selectedCourseId}
              onChange={(e) =>
                setSelectedCourseId(e.target.value)
              }
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>

            {editingEnrollmentId === null ? (
              <button
                className="primary-button"
                onClick={handleAddEnrollment}
              >
                Enroll Student
              </button>
            ) : (
              <>
                <button
                  className="primary-button"
                  onClick={handleUpdateEnrollment}
                >
                  Update Enrollment
                </button>

                <button
                  className="cancel-button"
                  onClick={clearEnrollmentForm}
                >
                  Cancel
                </button>
              </>
            )}
          </div>

          <h2 className="table-title">Enrollments</h2>

          {enrollments.length === 0 ? (
            <p className="empty-message">
              No enrollments available.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>{enrollment.id}</td>

                      <td>
                        {enrollment.student.firstName}{" "}
                        {enrollment.student.lastName}
                      </td>

                      <td>
                        {enrollment.course.courseCode}
                      </td>

                      <td>
                        {enrollment.course.courseName}
                      </td>

                      <td>
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEditEnrollment(enrollment)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteEnrollment(
                              enrollment.id
                            )
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
      )}
    </div>
  );
}

export default App;