import React from "react"
import IrrigationWebSocket from "../connections/irrigationWebSocket"
import Dashboard from "./dashboard"
import PlanterDetails from "./planterDetails"
import { Page } from "../styles/layout"
import { Routes, Route } from "react-router-dom"

function Main() {
    // const [levels, setLevels] = useState(false)

    return (
        <Page>
            <IrrigationWebSocket>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="planter/:id" element={<PlanterDetails />} />
                </Routes>
            </IrrigationWebSocket>
        </Page>
    )
}

export default Main
