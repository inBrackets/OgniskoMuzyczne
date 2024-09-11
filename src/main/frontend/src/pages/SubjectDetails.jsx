import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddStudent from "../components/studentComponents/AddStudent";
import StudentsList from "../components/studentComponents/StudentsList";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

function SubjectDetails({updateSubjects}) {
    const { id } = useParams();

    const [subject, setSubject] = useState([
        // { id: 1, month: "January", description: "First challenge description" },
        // { id: 2, month: "February", description: "Second challenge description" },
    ]);

    const [students, setStudents] = useState([
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
        onSubjectIdChange();
    }, [id]);


    const onSubjectIdChange = () => {
        fetchData("http://" + window.location.hostname + ":8080/api/v1/subjects/" + id, setSubject);
        fetchData("http://" + window.location.hostname + ":8080/api/v1/students/getBySubjectId/" + id, setStudents);
        updateSubjects();
    }

    return (
        <div className="container mt-5">
            <Card className="mb-5">
                <Card.Title className="m-3">Wpłaty Uczniów Rok Szkolny 2024/2025</Card.Title>
                <ListGroup className="list-group-flush" >
                    <ListGroup.Item><strong>Imię i nazwisko instruktora: </strong>{subject.teacherName}</ListGroup.Item>
                    <ListGroup.Item><strong>Przedmiot: </strong>{subject.subjectName}</ListGroup.Item>
                    <ListGroup.Item><strong>Cena: </strong>{subject.subjectPrice} zł</ListGroup.Item>
                </ListGroup>
            </Card>
            <StudentsList data={students} onDataChange={onSubjectIdChange} />
            <AddStudent onDataChange={onSubjectIdChange} subjectId={id} />
        </div>
    );
}



export default SubjectDetails;