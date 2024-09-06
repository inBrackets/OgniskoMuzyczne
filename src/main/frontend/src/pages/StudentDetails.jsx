import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Card, ListGroup, Modal, Button } from "react-bootstrap";
import MonthStateBadge from "../components/studentComponents/studentsMonth/MonthStateBadge";
import UpdateMonthModal from "../components/studentComponents/studentsMonth/UpdateMonthModal";

function StudentDetails() {
    const { id } = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
            <UpdateMonthModal show={show} onHide={handleClose} onDataChange={onStudentChange} />
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
                    <RowForStudentDetails name={"September"} />
                    <RowForStudentDetails name={"October"} />
                    <RowForStudentDetails name={"November"} />
                    <RowForStudentDetails name={"December"} />
                    <RowForStudentDetails name={"January"} />
                    <RowForStudentDetails name={"February"} />
                    <RowForStudentDetails name={"March"} />
                    <RowForStudentDetails name={"April"} />
                    <RowForStudentDetails name={"May"} />
                    <RowForStudentDetails name={"June"} />

                </tbody>
            </Table>
            <div>The student id is {id}</div>
        </>
    )

    function RowForStudentDetails({ name }) {
        return (
            <tr>
                <td>{name}</td>
                <td><PaymentStatusButton onClick={handleShow} monthName={name} monthState={getPaymentStatus(student, name)}>
                    {getPaymentStatus(student, name)}
                </PaymentStatusButton></td>
                <td>{getNumberOfLessons(student, name)}</td>
                <td>{getPricePerMonth(student, name)}</td>
            </tr>
        )
    }

    function PaymentStatusButton({ monthName }) {
        var monthState = getPaymentStatus(student, monthName);
        var variant = "danger";
        if (monthState === "NEUTRAL") variant = "secondary";
        if (monthState === "PAID") variant = "success";
        if (monthState === "UNPAID") variant = "danger";
        return (
            <Button variant={variant} onClick={handleShow}>{monthState}</Button>
        )
    }
}



export default StudentDetails;