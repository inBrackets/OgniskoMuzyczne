import Teacher from "./Teacher";

function TeachersList({ data, onDataChange}) {
  return (
    <div className="list-group">
      {data.map((element) => (
        <Teacher key={element.id} element={element} onDataChange={onDataChange}/>
      ))}
    </div>
  );
}

export default TeachersList;
