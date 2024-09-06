import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

function SubjectDetails({ updateStudents }) {
    const { id } = useParams();


    const [subject, setSubject] = useState([
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
        fetchData("http://" + window.location.hostname + ":8080/api/v1/subjects/" + id, setSubject);
        updateStudents();
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{subject.subjectName}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><strong>Teacher: </strong>{subject.teacherName}</ListGroup.Item>
                    <ListGroup.Item><strong>Price: </strong>{subject.subjectPrice} zł</ListGroup.Item>
                </ListGroup>
            </Card>
            <div>The student id is {id}</div>
        </>
    )
}



export default SubjectDetails;