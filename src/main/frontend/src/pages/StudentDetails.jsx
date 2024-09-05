import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Card, ListGroup } from "react-bootstrap";
import MonthStateBadge from "../components/studentComponents/studentsMonth/MonthStateBadge";

function StudentDetails() {
    const { id } = useParams();

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
    });


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
            <Card>
                <Card.Body>
                    <Card.Title>{student.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><strong>Tel. </strong>{student.phoneNumber}</ListGroup.Item>
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
                <td><MonthStateBadge monthState={getPaymentStatus(student, name)}>
                    {getPaymentStatus(student, name)}
                </MonthStateBadge></td>
                <td>{getNumberOfLessons(student, name)}</td>
                <td>{getPricePerMonth(student, name)}</td>
            </tr>
        )
    }
}



export default StudentDetails;