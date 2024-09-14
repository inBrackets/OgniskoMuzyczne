import { Stack } from "react-bootstrap";
import MonthStateBadge from "./studentsMonth/MonthStateBadge";
function Student({ element }) {
  return (
    <a
      href={`#/student/${element.id}`}
      className="list-group-item list-group-item-action"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1 mt-2 ms-1">{element.name}</h5>
        {/* <button type="button" className="btn btn-danger mb-3 mt-2" onClick={handleSubmit}>
          Delete
        </button> */}

      </div>
      <Stack direction="vertical" gap={2}>
        <Stack direction="horizontal" gap={2} className="d-flex flex-wrap">
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "September")}>
            September
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "October")}>
            October
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "November")}>
            November
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "December")}>
            December
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "January")}>
            January
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "February")}>
            February
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "March")}>
            March
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "April")}>
            April
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "May")}>
            May
          </MonthStateBadge>
          <MonthStateBadge monthSchedule={element.monthSchedule.find(schedule => schedule.monthName === "June")}>
            June
          </MonthStateBadge>
        </Stack>
      </Stack>
      {/* <p className="mb-1">{element.id}</p> */}
    </a>
  );
}

export default Student;
