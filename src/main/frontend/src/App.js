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

function App() {
  const [teachers, setTeachers] = useState([
    // { id: 1, month: "January", description: "First challenge description" },
    // { id: 2, month: "February", description: "Second challenge description" },
  ]);

  const [subjects, setSubjects] = useState([
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
  }, []);

  const onTeacherChange = () => {
    fetchData("http://" + window.location.hostname + ":8080/api/v1/teachers", setTeachers);
  }

  const onSubjectChange = () => {
    fetchData("http://" + window.location.hostname + ":8080/api/v1/subjects", setSubjects);
  }

  return (
    <>
    <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
    <Container>
      <Navbar.Brand>
        <Link to="/" className='navbar-brand text-success fw-semibold'>
        Ognisko Muzyczne
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav.Link href='/#/' className='active text-uppercase'></Nav.Link>
              <Nav.Link href='/#/teachers' className='text-uppercase'>Teachers</Nav.Link>
              <Nav.Link href='/#/subjects' className='text-uppercase'>Subjects</Nav.Link>
              <Nav.Link href='/#/contact' className='text-uppercase'>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Container>
    </Navbar>

    <Routes>
        <Route path='/' element={<Locations />} />
        <Route path='/teachers' element={<TeachersPage teachers={teachers} onTeacherChange={onTeacherChange}/>} />
        <Route path='/subjects' element={<SubjectsPage subjects={subjects} onSubjectChange={onSubjectChange}/>}  />
        <Route path='/contact' element={<Greeting name="Sareh" message="cool" />} />
      </Routes>


    </>
  );
}

export default App;
