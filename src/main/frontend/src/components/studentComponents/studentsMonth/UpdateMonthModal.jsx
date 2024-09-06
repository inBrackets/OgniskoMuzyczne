import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function UpdateMonthModal({ show, onHide, onDataChange, monthName }) {
    const [paymentStatus, setPaymentStatus] = useState("");
    const [numberOfLessons, setNumberOfLessons] = useState("");

    const fetchStudentData = async () => {
        try {
            const response = await axios.get("http://" + window.location.hostname + ":8080/api/v1/students/1");
            const studentData = response.data;
            const schedule = studentData.monthSchedule.find(schedule => schedule.monthName === monthName);
            setPaymentStatus(schedule.monthState);
            setNumberOfLessons(schedule.numberOfLessons);
        } catch (error) {
            console.error("Error fetching student data: ", error);
        }
    };

    // Fetch default values from the API on component mount
    useEffect(() => {
        fetchStudentData();
    }, [show]); // Runs only on component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch("http://" + window.location.hostname + ":8080/api/v1/students/1", {

                "monthSchedule": [
                    {
                        "monthName": monthName,
                        "monthState": paymentStatus,
                        "numberOfLessons": numberOfLessons
                    }
                ]
            });
            setPaymentStatus("");
            setNumberOfLessons("");
            onDataChange();
        } catch (error) {
            console.error("Error adding student: ", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading for {monthName}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}></form>
            <Modal.Body>
                <form onSubmit={handleSubmit} id="modalForm">
                    <div className="mb-3">
                        <label htmlFor="paymentStatus" className="form-label">
                            Payment Status
                        </label>
                        <div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="paymentStatusPAID"
                                    value="PAID"
                                    checked={paymentStatus === "PAID"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="paymentStatusPAID">
                                    PAID
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="paymentStatusUNPAID"
                                    value="UNPAID"
                                    checked={paymentStatus === "UNPAID"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="paymentStatusUNPAID">
                                    UNPAID
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="paymentStatusNEUTRAL"
                                    value="NEUTRAL"
                                    checked={paymentStatus === "NEUTRAL"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="paymentStatusNEUTRAL">
                                    NEUTRAL
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Number Of Lessons
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g., 4"
                            id="numberOfLessons"
                            value={numberOfLessons}
                            onChange={(e) => setNumberOfLessons(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide} type="submit" form="modalForm">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateMonthModal;