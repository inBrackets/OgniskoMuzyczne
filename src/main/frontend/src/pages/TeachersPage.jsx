import AddTeacher from "../components/AddTeacher";
import TeacherList from "../components/TeacherList";

function TeachersPage({ teachers, fetchTeachers}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">Teachers List</h1>
    <AddTeacher onTeacherAdded={fetchTeachers}/>
    <TeacherList teachers={teachers} onTeacherDelete={fetchTeachers}/>
  </div>
);
}

export default TeachersPage;