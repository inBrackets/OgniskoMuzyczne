import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Greeting from "./components/Greeting";
import TeachersPage from "./pages/TeachersPage";
import SubjectsPage from "./pages/SubjectsPage";
import Locations from "./pages/Locations";
import AllStudentsPage from "./pages/AllStudentsPage";
import StudentDetails from "./pages/StudentDetails";
import AddStudentsPage from "./pages/AddStudentsPage";
import SubjectDetails from "./pages/SubjectDetails";

function App() {

  // Step 1: Add state to control navbar collapse
  const [expanded, setExpanded] = useState(false);

  // Step 2: Handle menu item clicks
  const handleNavItemClick = () => {
    setExpanded(false); // Collapse the navbar after a menu item is clicked
  };



  const [teachers, setTeachers] = useState([
    // { id: 1, month: "January", description: "First challenge description" },
    // { id: 2, month: "February", description: "Second challenge description" },
  ]);

  const [subjects, setSubjects] = useState([
    // { id: 1, month: "January", description: "First challenge description" },
    // { id: 2, month: "February", description: "Second challenge description" },
  ]);

  const [students, setStudents] = useState([
    // { id: 1, month: "January", description: "First challenge description" },
    // { id: 2, month: "February", description: "Second challenge description" },
  ]);

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data);
    } catch (error) {
      console.error("Error fetching teachers: ", error);
    }
  };

  useEffect(() => {
    onTeacherChange();
    onSubjectChange();
    onStudentChange();
  }, []);

  const onTeacherChange = () => {
    fetchData("http://" + window.location.hostname + ":8080/api/v1/teachers", setTeachers);
  }

  const onSubjectChange = () => {
    fetchData("http://" + window.location.hostname + ":8080/api/v1/subjects", setSubjects);
  }

  const onStudentChange = () => {
    fetchData("http://" + window.location.hostname + ":8080/api/v1/students", setStudents);
  }

  return (
    <>
      <Navbar expanded={expanded} expand="lg" className='fixed-top bg-body-tertiary shadow'>
        <Container>
          <Navbar.Brand>
            <Link to="/" className='navbar-brand text-success fw-semibold'>
              Ognisko Muzyczne
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setExpanded(expanded ? false : 'expanded')} />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav.Link href='/#/students' className='text-uppercase' onClick={handleNavItemClick}>Add Students</Nav.Link>
              {/* <Nav.Link href='/#/teachers' className='text-uppercase' onClick={handleNavItemClick}>Teachers</Nav.Link> */}
              <Nav.Link href='/#/subjects' className='text-uppercase' onClick={handleNavItemClick}>Subjects</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: '50px' }}></div>
      <Routes>
        {/* <Route path='/' element={<Locations />} /> */}
        <Route path='/' element={<AllStudentsPage students={students} onStudentChange={onStudentChange} />} />
        <Route path='/students' element={<AddStudentsPage students={students} onStudentChange={onStudentChange} />} />
        <Route path='/teachers' element={<TeachersPage teachers={teachers} onTeacherChange={onTeacherChange} />} />
        <Route path='/subjects' element={<SubjectsPage subjects={subjects} onSubjectChange={onSubjectChange} />} />
        <Route path='/student/:id' element={<StudentDetails updateStudents={onStudentChange} />} />
        <Route path='/subject/:id' element={<SubjectDetails updateStudents={onStudentChange} />} />
      </Routes>


    </>
  );
}

export default App;
