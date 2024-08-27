import Teacher from "./Teacher";

function TeacherList({ teachers, onTeacherDelete }) {
  return (
    <div className="list-group">
      {teachers.map((teacher) => (
        <Teacher key={teacher.id} teacher={teacher} onTeacherDelete={onTeacherDelete}/>
      ))}
    </div>
  );
}

export default TeacherList;
