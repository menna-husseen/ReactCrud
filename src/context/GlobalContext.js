
import { createContext, useContext, useState } from "react"
import axios from "axios"

// ------------Create context-------------
const GlobalContext = createContext()

// Base URL for API
const API_BASE_URL = "http://localhost:3000"

export const useGlobalContext = () => useContext(GlobalContext)

export default function GlobalContextProvider({ children }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get all courses
  const getAllCourses = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/courses`)
      setCourses(response.data)
      setLoading(false)
      return response.data
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error("Error fetching courses:", error)
      throw error
    }
  }

  // Get course by ID
  const getCourseById = async (id) => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${id}`)
      setLoading(false)
      return response.data
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error(`Error fetching course with id ${id}:`, error)
      throw error
    }
  }

  // Create new course
  const createCourse = async (courseData) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/courses`, courseData)
      setLoading(false)
      return response.data
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error("Error creating course:", error)
      throw error
    }
  }

  // Update course
  const updateCourse = async (id, courseData) => {
    setLoading(true)
    try {
      const response = await axios.put(`${API_BASE_URL}/courses/${id}`, courseData)
      setLoading(false)
      return response.data
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error(`Error updating course with id ${id}:`, error)
      throw error
    }
  }

  // Delete course
  const deleteCourse = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(`${API_BASE_URL}/courses/${id}`)
      // Update courses state by removing the deleted course
      setCourses(courses.filter((course) => course.id !== id))
      setLoading(false)
      return response.data
    } catch (error) {
      setError(error.message)
      setLoading(false)
      console.error(`Error deleting course with id ${id}:`, error)
      throw error
    }
  }

  const contextValue = {
    courses,
    loading,
    error,
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  }

  return <GlobalContext.Provider value={contextValue}>
  {children}
  </GlobalContext.Provider>
}

