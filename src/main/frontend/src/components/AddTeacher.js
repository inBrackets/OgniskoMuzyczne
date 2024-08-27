import axios from "axios";
import { useState } from "react";

function AddTeacher({ onTeacherAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/teachers", {
        name,
      });
      setName("");
      onTeacherAdded();
    } catch (error) {
      console.error("Error adding challenge: ", error);
    }
  };

  return (
    <div className="card my-5">
      <div className="card-header">Add new Teacher</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., January"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
