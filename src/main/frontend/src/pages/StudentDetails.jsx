import { useParams } from "react-router-dom";

function StudentDetails() {
    const { id } = useParams();
    return (
        <>
        <br/>
            <br />
            <br />
            <br />
            <br />
        <div>The student id is {id}</div>
        </>
    )
}

export default StudentDetails;