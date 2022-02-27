import React from "react"
import PlanterSummaryDisplay from "../components/planterSummaryDisplay"
import { Container } from "../styles/layout"
import { Title } from "../styles/text"

function Dashboard() {
    return (
        <Container>
            <Title>Eden Report</Title>
            <PlanterSummaryDisplay />
        </Container>
    )
}

export default Dashboard
