import Teacher from "./Teacher";

function GroupList({ data, onDataChange, ComponentType }) {
  return (
    <div className="list-group">
      {data.map((element) => (
        <ComponentType key={element.id} element={element} onDataChange={onDataChange}/>
      ))}
    </div>
  );
}

export default GroupList;
