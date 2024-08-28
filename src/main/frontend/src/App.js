import "./App.css";
import TeacherList from "./components/TeacherList";
import AddTeacher from "./components/AddTeacher";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Greeting from "./components/Greeting";
import TeachersPage from "./pages/TeachersPage";

function App() {
  const [teachers, setTeachers] = useState([
    // { id: 1, month: "January", description: "First challenge description" },
    // { id: 2, month: "February", description: "Second challenge description" },
  ]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers: ", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTeacherAdded = () => {
    fetchTeachers();
  }
  return (
    <>
    <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
    <Container>
      <Navbar.Brand>
        <Link to="/" className='navbar-brand text-success fw-semibold'>
        React Restaurant
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav.Link href='/' className='active text-uppercase'></Nav.Link>
              <Nav.Link href='/teachers' className='text-uppercase'>Teachers</Nav.Link>
              <Nav.Link href='/about' className='text-uppercase'>About</Nav.Link>
              <Nav.Link href='/contact' className='text-uppercase'>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
    </Container>
    </Navbar>

    <Routes>
        <Route path='/' element={<Greeting name="Sareh" message="cool" />} />
        <Route path='/teachers' element={<TeachersPage teachers={teachers} fetchTeachers={fetchTeachers}/>} />
        <Route path='/about' element={<Greeting name="Sareh" message="cool" />} />
        <Route path='/contact' element={<Greeting name="Sareh" message="cool" />} />
      </Routes>


    </>
  );
}

export default App;
