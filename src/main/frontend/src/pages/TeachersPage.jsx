import AddTeacher from "../components/teacherComponents/AddTeacher";
import TeachersList from "../components/teacherComponents/TeachersList";

function TeachersPage({ teachers, onTeacherChange}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">Teachers List</h1>
    <AddTeacher onDataChange={onTeacherChange}/>
    <TeachersList data={teachers} onDataChange={onTeacherChange} />
  </div>
);
}

export default TeachersPage;