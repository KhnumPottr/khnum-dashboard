import React from "react"
import ManualIrrigationSwitch from "../components/manualIrrigationSwitch"
import PlanterSummaryDisplay from "../components/planterSummaryDisplay"
import { Container, Header, Content } from "rsuite"
import IrrigationWebSocket from "../connections/irrigationWebSocket"

function Dashboard() {
    return (
        <Container>
            <IrrigationWebSocket>
                <Header>
                    <ManualIrrigationSwitch />
                </Header>
                <Content>
                    <PlanterSummaryDisplay />
                </Content>
            </IrrigationWebSocket>
        </Container>
    )
}

export default Dashboard
