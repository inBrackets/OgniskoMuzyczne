import Student from "./Student";

function StudentsList({ data, onDataChange }) {
  return (
    <div className="list-group">
      {data.map((element) => (
        <Student key={element.id} element={element} onDataChange={onDataChange}/>
      ))}
    </div>
  );
}

export default StudentsList;
