import Subject from "./Subject";

function SubjectsList({ data, onDataChange }) {
  return (
    <div className="list-group">
      {data.map((element) => (
        <Subject key={element.id} element={element} onDataChange={onDataChange}/>
      ))}
    </div>
  );
}

export default SubjectsList;
