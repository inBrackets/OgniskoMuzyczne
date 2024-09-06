import Student from "./Student";

function StudentsList({ data, onDataChange }) {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="list-group">
      {sortedData.map((element) => (
        <Student key={element.id} element={element} onDataChange={onDataChange}/>
      ))}
    </div>
  );
}

export default StudentsList;
