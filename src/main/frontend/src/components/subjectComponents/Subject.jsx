import axios from "axios";

function Subject({ element, onDataChange }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://" + window.location.hostname + ":8080/api/v1/subjects/" + element.id);
      onDataChange();
    } catch (error) {
      console.error("Error deleting subject: ", error);
    }
  };

  return (
    <a
      href={`#/subject/${element.id}`}
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{element.subjectName}</h5>
        {/* <button type="button" className="btn btn-danger" onClick={handleSubmit}>Delete</button> */}
      </div>
      <p className="mb-1">{element.teacherName}</p>
    </a>
  );
}

export default Subject;
