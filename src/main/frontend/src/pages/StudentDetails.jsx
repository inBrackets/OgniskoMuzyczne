import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Card, ListGroup, Modal, Button } from "react-bootstrap";
import MonthStateBadge from "../components/studentComponents/studentsMonth/MonthStateBadge";
import UpdateMonthModal from "../components/studentComponents/studentsMonth/UpdateMonthModal";

function StudentDetails({ updateStudents }) {
    const { id } = useParams();

    const [show, setShow] = useState(false);
    const [selectedMonthName, setSelectedMonthName] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (monthName) => {
        setSelectedMonthName(monthName);
        setShow(true);
    };


    const [student, setStudent] = useState([
        // { id: 1, month: "January", description: "First challenge description" },
        // { id: 2, month: "February", description: "Second challenge description" },
    ]);

    const fetchData = async (url, setter) => {
        try {
            const response = await axios.get(url);
            setter(response.data);
        } catch (error) {
            console.error("Error fetching student: ", error);
        }
    };

    useEffect(() => {
        onStudentChange();
    }, [id]);


    const onStudentChange = () => {
        fetchData("http://" + window.location.hostname + ":8080/api/v1/students/" + id, setStudent);
        updateStudents();
    }

    const getPaymentStatus = (studentData, monthName) => {
        if (!studentData || !studentData.monthSchedule) return "N/A";
        const targetMonthSchedule = studentData.monthSchedule.find(schedule => schedule.monthName === monthName);
        return targetMonthSchedule ? targetMonthSchedule.monthState : "N/A";
    }

    const getNumberOfLessons = (studentData, monthName) => {
        if (!studentData || !studentData.monthSchedule) return "N/A";
        const targetMonthSchedule = studentData.monthSchedule.find(schedule => schedule.monthName === monthName);
        return targetMonthSchedule ? targetMonthSchedule.numberOfLessons : "N/A";
    }

    const getPricePerMonth = (studentData, monthName) => {
        if (!studentData || !studentData.monthSchedule) return "N/A";
        const targetMonthSchedule = studentData.monthSchedule.find(schedule => schedule.monthName === monthName);
        return targetMonthSchedule ? targetMonthSchedule.numberOfLessons * student.pricePerLesson : "N/A";
    }

    return (
        <>
            <UpdateMonthModal show={show} onHide={handleClose} onDataChange={onStudentChange} student={student} monthName={selectedMonthName} studentId={id} />
            <Card>
                <Card.Body>
                    <Card.Title>{student.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><strong>Tel. </strong>{student.phoneNumber}</ListGroup.Item>
                    <ListGroup.Item><strong>Price: </strong>{student.pricePerLesson} zł</ListGroup.Item>
                </ListGroup>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Payment Status</th>
                        <th>Number of Lessons</th>
                        <th>To Pay</th>
                    </tr>
                </thead>
                <tbody>
                    <RowForStudentDetails monthName={"September"} />
                    <RowForStudentDetails monthName={"October"} />
                    <RowForStudentDetails monthName={"November"} />
                    <RowForStudentDetails monthName={"December"} />
                    <RowForStudentDetails monthName={"January"} />
                    <RowForStudentDetails monthName={"February"} />
                    <RowForStudentDetails monthName={"March"} />
                    <RowForStudentDetails monthName={"April"} />
                    <RowForStudentDetails monthName={"May"} />
                    <RowForStudentDetails monthName={"June"} />

                </tbody>
            </Table>
            <div>The student id is {id}</div>
        </>
    )

    function RowForStudentDetails({ monthName }) {
        return (
            <tr>
                <td>{monthName}</td>
                <td><PaymentStatusButton monthName={monthName} monthState={getPaymentStatus(student, monthName)}>
                    {getPaymentStatus(student, monthName)}
                </PaymentStatusButton></td>
                <td>{getNumberOfLessons(student, monthName)}</td>
                <td>{getPricePerMonth(student, monthName)}</td>
            </tr>
        )
    }

    function PaymentStatusButton({ monthName }) {
        var monthState = getPaymentStatus(student, monthName);
        var variant = "danger";
        if (monthState === "NEUTRAL") variant = "secondary";
        if (monthState === "PAID") variant = "success";
        if (monthState === "UNPAID") variant = "danger";
        if (getNumberOfLessons(student, monthName) === 0) {
            variant = "secondary";
            monthState = "NO LESSONS"
        }
        return (
            <Button variant={variant} onClick={() => handleShow(monthName)}>{monthState}</Button>
        )
    }
}



export default StudentDetails;