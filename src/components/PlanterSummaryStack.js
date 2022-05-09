import React, { useState } from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import PlanterDetails from "./planterDetails/planterDetailsDrawer"
import { Stack } from "rsuite"
import PlanterSummaryCard from "./planterSummary/planterSummaryCard"
import PlanterSummaryPlaceholder from "./planterSummary/planterSummaryPlaceholder"

function PlanterSummaryStack() {
    const { planterDetails } = useIrrigation()
    const [open, setOpen] = useState(false)
    const [plantId, setPlantId] = useState("empty")

    const showPlantDetails = (e, plantId) => {
        e.preventDefault()
        setOpen(true)
        setPlantId(plantId)
    }

    if (planterDetails.length === 1)
        return (
            <Stack wrap spacing={12} justifyContent={"center"}>
                <PlanterSummaryPlaceholder />
            </Stack>
        )

    return (
        <div>
            <Stack wrap spacing={12} justifyContent={"center"}>
                {Object.keys(planterDetails).map((key) => {
                    return <PlanterSummaryCard key={key} planter={planterDetails[key]} onClick={showPlantDetails} />
                })}
            </Stack>
            <PlanterDetails plantId={plantId} toggle={open} setToggle={setOpen} />
        </div>
    )
}

export default PlanterSummaryStack
