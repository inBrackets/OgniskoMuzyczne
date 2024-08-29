import { Badge } from "react-bootstrap"

function MonthStateBadge({ children, monthState }) {
    if (monthState ==="PAID") {
        return <Badge bg="success">{children}</Badge>
    }
    if (monthState ==="UNPAID") {
        return <Badge bg="danger">{children}</Badge>
    }
    if (monthState ==="NOT_APPLICABLE") {
        return <Badge bg="secondary">{children}</Badge>
    }
    return (
        <div>{children}</div>
    )
}

export default MonthStateBadge;