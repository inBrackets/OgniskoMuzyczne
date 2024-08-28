import AddTeacher from "../components/AddTeacher";
import GroupList from "../components/GroupList";
import Teacher from "../components/Teacher";

function TeachersPage({ teachers, onTeacherChange}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">Teachers List</h1>
    <AddTeacher onDataChange={onTeacherChange}/>
    <GroupList data={teachers} onDataChange={onTeacherChange} ComponentType={Teacher}/>
  </div>
);
}

export default TeachersPage;