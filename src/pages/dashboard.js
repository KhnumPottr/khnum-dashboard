import React from "react"
import PlanterSummaryStack from "../components/PlanterSummaryStack"
import { Container, Content } from "rsuite"
import IrrigationWebSocket from "../connections/irrigationWebSocket"

function Dashboard() {
    return (
        <Container>
            <IrrigationWebSocket>
                <Content>
                    <PlanterSummaryStack />
                </Content>
            </IrrigationWebSocket>
        </Container>
    )
}

export default Dashboard
