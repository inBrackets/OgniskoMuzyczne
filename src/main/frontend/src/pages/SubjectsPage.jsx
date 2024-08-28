import AddSubject from "../components/AddSubject";
import GroupList from "../components/GroupList";
import Subject from "../components/Subject";

function SubjectsPage({ subjects, onSubjectChange}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">Subjects List</h1>
    <AddSubject onDataChange={onSubjectChange}/>
    <GroupList data={subjects} onDataChange={onSubjectChange} ComponentType={Subject}/>
  </div>
);
}

export default SubjectsPage;