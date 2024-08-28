import axios from "axios";

function Subject({ element, fetchData }) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:8080/api/v1/subjects/" + element.id);
      fetchData();
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  return (
    <a
      href="#"
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{element.name}</h5>
        <button type="button" className="btn btn-danger" onClick={handleSubmit}>Delete</button>
      </div>
      <p className="mb-1">{element.id}</p>
    </a>
  );
}

export default Subject;