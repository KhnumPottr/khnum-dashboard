import React from "react"
import IrrigationWebSocket from "../connections/irrigationWebSocket"

function Dashboard() {
    // const [levels, setLevels] = useState(false)

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h4>Moisture Levels </h4>
                <IrrigationWebSocket />
            </div>
        </div>
    )
}

export default Dashboard
