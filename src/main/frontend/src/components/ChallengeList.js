import Challenge from "./Challenge";

function ChallengeList({ challenges, onTeacherDelete }) {
  return (
    <div className="list-group">
      {challenges.map((challenge) => (
        <Challenge key={challenge.id} challenge={challenge} onTeacherDelete={onTeacherDelete}/>
      ))}
    </div>
  );
}

export default ChallengeList;
