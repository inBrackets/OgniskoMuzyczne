import AddSubject from "../components/subjectComponents/AddSubject";
import Subject from "../components/subjectComponents/Subject";
import SubjectsList from "../components/subjectComponents/SubjectsList";

function SubjectsPage({ subjects, onSubjectChange}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">Subjects List</h1>
    <SubjectsList data={subjects} onDataChange={onSubjectChange}/>
    <AddSubject onDataChange={onSubjectChange} />
  </div>
);
}

export default SubjectsPage;