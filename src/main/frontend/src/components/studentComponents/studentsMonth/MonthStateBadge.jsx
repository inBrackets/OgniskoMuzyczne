import { Badge, Button } from "react-bootstrap"

function MonthStateBadge({ children, monthState }) {
    if (monthState.numberOfLessons === 0) {
        return <Badge bg="secondary">{children}</Badge>
    }
    if (monthState.monthState === "PAID") {
        return <Badge bg="success">{children}</Badge>
    }
    if (monthState.monthState === "UNPAID") {
        return <Badge bg="danger">{children}</Badge>
    }
    return (
        <div>{children}</div>
    )
}

export default MonthStateBadge;