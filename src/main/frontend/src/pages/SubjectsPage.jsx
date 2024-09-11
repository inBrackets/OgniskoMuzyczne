import AddSubject from "../components/subjectComponents/AddSubject";
import SubjectsList from "../components/subjectComponents/SubjectsList";
import { translate } from "../utils/Translate";

function SubjectsPage({ subjects, onSubjectChange}) {
return(
    <div className="container mt-5">
    <h1 className="text-center mb-4">{translate("Subjects List")}</h1>
    <SubjectsList data={subjects} onDataChange={onSubjectChange}/>
    <AddSubject onDataChange={onSubjectChange} />
  </div>
);
}

export default SubjectsPage;