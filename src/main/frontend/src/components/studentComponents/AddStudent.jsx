import axios from "axios";
import { useState } from "react";
import { translate } from "../../utils/Translate";

function AddStudent({ onDataChange, subjectId }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = subjectId
        ? `http://${window.location.hostname}:8080/api/v1/students/withSubjectId/${subjectId}`
        : `http://${window.location.hostname}:8080/api/v1/students`;
      await axios.post(url, {
        name, phoneNumber

      });
      setName("");
      setPhoneNumber("");
      onDataChange();
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <div className="card my-5">
      <div className="card-header">{translate("Add a student")}</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              {translate("Students name")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              {translate("Contact")}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {translate("Submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
