import React, { useEffect } from "react"
import PropTypes from "prop-types"
import IrrigationGraph from "./graphs/irrigationGraph"
import { LineContainer } from "../styles/graphDisplays"
import { useIrrigation } from "../connections/irrigationWebSocket"

import { Stack, Panel, FlexboxGrid, Col, Button, Placeholder } from "rsuite"

function PlanterDetailsDisplay({ plantId }) {
    const irrigationData = useIrrigation()
    const planter = irrigationData.nodes[plantId]
    const sendMessage = irrigationData.send

    useEffect(() => {
        if (planter != undefined && planter.data.length == 1) {
            sendMessage(JSON.stringify({ nodeName: plantId, messageType: "IRRIGATION_ARRAY_DATA", payload: null }))
        }
    }, [planter, plantId, sendMessage])

    return (
        <Panel style={{ paddingTop: "1rem" }}>
            <LineContainer>
                <IrrigationGraph planter={plantId} />
            </LineContainer>
        </Panel>
    )
}

PlanterDetailsDisplay.propTypes = {
    plantId: PropTypes.string,
}

export default PlanterDetailsDisplay
