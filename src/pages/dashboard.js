import { Pane } from "evergreen-ui"
import React from "react"
import IrrigationWebSocket from "../connections/irrigationWebSocket"

function Dashboard() {
    // const [levels, setLevels] = useState(false)

    return (
        <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
            <h1>Dashboard</h1>
            <div>
                <h4>Moisture Levels </h4>
                <IrrigationWebSocket />
            </div>
        </Pane>
    )
}

export default Dashboard
