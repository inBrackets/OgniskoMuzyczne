import axios from "axios";

function Teacher({ teacher, onTeacherDelete }) {
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:8080/api/v1/teachers/" + teacher.id);
      onTeacherDelete();
    } catch (error) {
      console.error("Error adding teacher: ", error);
    }
  };

  return (
    <a
      href="#"
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{teacher.name}</h5>
        <button type="button" class="btn btn-danger" onClick={handleSubmit}>Delete</button>
      </div>
      <p className="mb-1">{teacher.id}</p>
    </a>
  );
}

export default Teacher;
