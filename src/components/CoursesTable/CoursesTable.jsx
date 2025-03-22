import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context/GlobalContext"
import "./CoursesTable.css"

export default function CoursesTable() {
  const navigate = useNavigate()
  const { getAllCourses, deleteCourse, loading, error } = useGlobalContext()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])

  // Edit function
  const editDetails = (id) => {
    navigate("/Courses/edit/" + id)
  }

  // Delete function
  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteCourse(id)
        .then(() => {
          alert("Course Data Deleted Successfully")
          // Update local state to reflect changes
          setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id))
          setFilteredCourses((prevCourses) => prevCourses.filter((course) => course.id !== id))
        })
        .catch((err) => console.error(err.message))
    }
  }

  // display Data
  useEffect(() => {
    getAllCourses()
      .then((data) => {
        setCourses(data)
        setFilteredCourses(data)
      })
      .catch((err) => console.error(err.message))
  }, [])

  // Search function
  const searchFunc = (e) => {
    const searchText = e.target.value.toLowerCase()
    const filtered = courses.filter((course) => course.Title.toLowerCase().includes(searchText))
    setFilteredCourses(filtered)
  }

  return (
    <>
      <div className="container my-5">
        <div className="shadow-lg rounded-3 p-4 text-center">
          <h2>Tech Courses</h2>

          <div className="search-container d-flex justify-content-between my-5">
            <input
              type="text"
              onKeyUp={searchFunc}
              className="form-control border-black w-75 me-2"
              placeholder="Search by Title"
            />

            <Link to="/Courses/Create" className="btn btn-dark w-25 py-2">
              ADD New Course <i className="fa-solid fa-plus text-white ms-2"></i>
            </Link>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <div className="table-responsive">
            <table className="table table-striped table-hover ">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Instructor</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.Title}</td>
                    <td>{item.Description}</td>
                    <td>{item.Instructor}</td>
                    <td>{item.Duration}</td>
                    <td>
                      <button onClick={() => editDetails(item.id)} className="btn">
                        <i className="fa-solid fa-pen text-danger"></i>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteCourse(item.id)} className="btn">
                        <i className="fa-solid fa-trash text-primary"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              </div>
          )}
        </div>
      </div>
    </>
  )
}