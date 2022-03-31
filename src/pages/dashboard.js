import React from "react"
import ManualIrrigationSwitch from "../components/manualIrrigationSwitch"
import PlanterSummaryStack from "../components/PlanterSummaryStack"
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
                    <PlanterSummaryStack />
                </Content>
            </IrrigationWebSocket>
        </Container>
    )
}

export default Dashboard
