import StudentsList from "../components/studentComponents/StudentsList";
import { translate } from "../utils/Translate";

function AllStudentsPage({ students, onStudentChange }) {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{translate("Students List")}</h1>
      {/* <AddStudent onDataChange={onStudentChange}/> */}
      <StudentsList data={students} onDataChange={onStudentChange} />
    </div>
  );
}

export default AllStudentsPage;