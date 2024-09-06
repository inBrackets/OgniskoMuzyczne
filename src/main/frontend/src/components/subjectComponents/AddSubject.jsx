import axios from "axios";
import { useState } from "react";

function AddSubject({ onDataChange }) {
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [subjectPrice, setSubjectPrice] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://" + window.location.hostname + ":8080/api/v1/subjects", {
        subjectName, teacherName, subjectPrice
      });
      setTeacherName("");
      setSubjectName("");
      setSubjectPrice("");
      onDataChange();
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  return (
    <div className="card my-5">
      <div className="card-header">Add new Subject</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Subject Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Trombone"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Teacher's Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Tom"
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Subject price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="e.g., Tom"
              id="subjectPrice"
              value={subjectPrice}
              onChange={(e) => setSubjectPrice(e.target.value)}
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

export default AddSubject;
