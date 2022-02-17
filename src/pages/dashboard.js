import React from "react"
import PlanterDisplay from "../components/planterDisplay"
import { IrrigationWebSocket } from "../connections/irrigationWebSocket"
import { Page } from "../styles/layout"

function Dashboard() {
    // const [levels, setLevels] = useState(false)

    return (
        <IrrigationWebSocket>
            <h1>Hello World</h1>
            <Page>
                <PlanterDisplay />
            </Page>
        </IrrigationWebSocket>
    )
}

export default Dashboard
