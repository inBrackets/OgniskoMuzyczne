import logo from "./logo.svg";
import "./App.css";
import ChallengeList from "./components/ChallengeList";
import AddTeacher from "./components/AddTeacher";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
      console.error("Error fetching challenges: ", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTeacherAdded = () => {
    fetchTeachers();
  }
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Monthly Challenges</h1>
      <AddTeacher onTeacherAdded={handleTeacherAdded}/>
      <ChallengeList challenges={teachers} onTeacherDelete={handleTeacherAdded}/>
    </div>
  );
}

export default App;
