import { translateMonth } from "../../../utils/Translate"

function MonthStateBadge({ children, monthSchedule }) {
    if (monthSchedule.numberOfLessons === 0) {
        return <button type="button" class="btn btn-secondary btn-sm p-1">{translateMonth(children)}</button>
    }
    if (monthSchedule.monthState === "PAID") {
        return <button type="button" class="btn btn-success btn-sm p-1">{translateMonth(children)}</button>
    }
    if (monthSchedule.monthState === "UNPAID") {
        return <button type="button" class="btn btn-danger btn-sm p-1">{translateMonth(children)}</button>
    }
    return (
        <div>{children}</div>
    )
}

export default MonthStateBadge;