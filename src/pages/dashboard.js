import React from "react"
import PlanterDisplay from "../components/planterDisplay"
import { IrrigationWebSocket } from "../connections/irrigationWebSocket"
import { Page } from "../styles/layout"

function Dashboard() {
    // const [levels, setLevels] = useState(false)

    return (
        <Page>
            <IrrigationWebSocket>
                <PlanterDisplay />
            </IrrigationWebSocket>
        </Page>
    )
}

export default Dashboard
