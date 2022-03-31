import React, { useState } from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import PlanterDetails from "./planterDetailsDrawer"
import { Stack, Panel, FlexboxGrid, Col, Button, Placeholder } from "rsuite"
import PlanterSummaryCard from "./planterSummaryCard"
import PlanterSummaryPlaceholder from "./planterSummaryPlaceholder"

function PlanterSummaryStack() {
    const planterNodes = useIrrigation().nodes
    const [open, setOpen] = useState(false)
    const [plantId, setPlantId] = useState("empty")

    const showPlantDetails = (e, plantId) => {
        e.preventDefault()
        setOpen(true)
        setPlantId(plantId)
    }

    if (planterNodes.length === 1)
        return (
            <Stack wrap spacing={12} justifyContent={"center"}>
                <PlanterSummaryPlaceholder />
            </Stack>
        )

    return (
        <div>
            <Stack wrap spacing={12} justifyContent={"center"}>
                {Object.keys(planterNodes).map((key) => {
                    return (
                        <PlanterSummaryCard
                            key={key}
                            plantId={key}
                            onClick={showPlantDetails}
                            percentage={planterNodes[key].data[planterNodes[key].data.length - 1].moisturePercentage}
                        />
                    )
                })}
            </Stack>
            <PlanterDetails plantId={plantId} toggle={open} setToggle={setOpen} />
        </div>
    )
}

export default PlanterSummaryStack
