import { Badge, Button } from "react-bootstrap"

function MonthStateBadge({ children, monthState }) {
    if (monthState === "PAID") {
        return <Badge bg="success">{children}</Badge>
    }
    if (monthState === "UNPAID") {
        return <Badge bg="danger">{children}</Badge>
    }
    if (monthState === "NEUTRAL") {
        return <Button bg="secondary">{children}</Button>
    }
    return (
        <div>{children}</div>
    )
}

export default MonthStateBadge;