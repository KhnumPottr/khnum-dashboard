import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IrrigationGraph from "./graphs/irrigationGraph"
import { Section, Card, SectionWidthHalf, CardButtons } from "../styles/layout"
import { LineContainer } from "../styles/graphDisplays"
import { useIrrigation } from "../connections/irrigationWebSocket"

function PlanterDetailsDisplay() {
    const plantId = useParams().id
    const irrigationData = useIrrigation()
    const planter = irrigationData[plantId]
    const sendMessage = irrigationData.send

    useEffect(() => {
        if (planter != undefined && planter.data.length == 1) {
            sendMessage(JSON.stringify({ nodeName: plantId, messageType: "IRRIGATION_ARRAY_DATA", payload: null }))
        }
    }, [planter, plantId, sendMessage])

    return (
        <>
            <Card large>
                <LineContainer>
                    <IrrigationGraph planter={plantId} />
                </LineContainer>
            </Card>
        </>
    )
}

export default PlanterDetailsDisplay
