import AddStudent from "../components/studentComponents/AddStudent";
import StudentsList from "../components/studentComponents/StudentsList";

function AddStudentsPage({ students, onStudentChange }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Students List</h1>
      <StudentsList data={students} onDataChange={onStudentChange} />
      <AddStudent onDataChange={onStudentChange} />
    </div>
  );
}

export default AddStudentsPage;