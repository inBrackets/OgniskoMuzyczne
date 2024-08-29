import axios from "axios";
import { useState } from "react";

function AddStudent({ onDataChange }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://" + window.location.hostname + ":8080/api/v1/students", {
        name,
        "septemberState": "NOT_APPLICABLE",
        "octoberState": "NOT_APPLICABLE",
        "novemberState": "NOT_APPLICABLE",
        "decemberState": "NOT_APPLICABLE",
        "januaryState": "NOT_APPLICABLE",
        "februaryState": "NOT_APPLICABLE",
        "marchState": "NOT_APPLICABLE",
        "aprilState": "NOT_APPLICABLE",
        "mayState": "NOT_APPLICABLE",
        "juneState": "NOT_APPLICABLE",
      });
      setName("");
      onDataChange();
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <div className="card my-5">
      <div className="card-header">Add new Student</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Tom"
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

export default AddStudent;
