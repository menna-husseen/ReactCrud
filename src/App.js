import { BrowserRouter, Route, Routes } from "react-router-dom"
import CoursesTable from "./components/CoursesTable/CoursesTable"
import CreateCourses from "./components/CreateCourses/CreateCourses"
import EditCourses from "./components/EditCourses/EditCourses"
import GlobalContextProvider from "./context/GlobalContext"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<CoursesTable />}></Route>
            <Route path="/Courses/Create" element={<CreateCourses />}></Route>
            <Route path="/Courses/edit/:courseId" element={<EditCourses />}></Route>
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </>
  )
}

