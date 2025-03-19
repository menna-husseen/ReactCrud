import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext"

export default function CreateCourses() {
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Instructor, setInstructor] = useState("")
  const [Duration, setDuration] = useState("")
  const [Validation, setValidation] = useState(false)
  const navigate = useNavigate()

  const { createCourse, loading, error } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const courseData = { Title, Description, Instructor, Duration }

    createCourse(courseData)
      .then(() => {
        alert("Course Data saved Successfully")
        navigate("/")
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <div className="container my-5">
        <div className="shadow-lg rounded-3 p-4 text-center w-75 mx-auto">
          <h2>Add new course</h2>

          <div className="container my-5">
            <div>
              {error && <p className="text-danger">Error: {error}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  name="Title"
                  type="text"
                  placeholder="Title"
                  className="form-control my-2"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  onMouseDown={() => setValidation(true)}
                />
                {Title.length === 0 && Validation && <span className="text-danger">please enter your Title</span>}

                <input
                  name="Description"
                  type="text"
                  placeholder="Description"
                  className="form-control my-2"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  onMouseDown={() => setValidation(true)}
                />
                {Description.length === 0 && Validation && (
                  <span className="text-danger">please enter your Description</span>
                )}

                <input
                  name="Instructor"
                  type="text"
                  placeholder="Instructor Name"
                  className="form-control my-2"
                  value={Instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  required
                  onMouseDown={() => setValidation(true)}
                />
                {Instructor.length === 0 && Validation && (
                  <span className="text-danger">please enter your Instructor</span>
                )}

                <input
                  name="Duration"
                  type="text"
                  placeholder="Duration"
                  className="form-control my-2"
                  value={Duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  onMouseDown={() => setValidation(true)}
                />
                {Duration.length === 0 && Validation && <span className="text-danger">please enter your Duration</span>}
                <div className="text-start">
                  <button className="btn btn-success" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <Link to="/" className="btn btn-danger mx-3">
                    Back
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

