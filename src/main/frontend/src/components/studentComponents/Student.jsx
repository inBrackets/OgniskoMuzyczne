import axios from "axios";
import { Stack, Badge } from "react-bootstrap";
function Student({ element, onDataChange }) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://" + window.location.hostname + ":8080/api/v1/subjects/" + element.id);
      onDataChange();
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

export default Student;
