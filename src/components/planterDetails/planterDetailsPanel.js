import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import IrrigationGraph from "../graphs/irrigationGraph"
import { LineContainer } from "../../styles/graphDisplays"
import { useIrrigation } from "../../connections/irrigationWebSocket"
import { Divider, Panel, FlexboxGrid, Col, Stack } from "rsuite"
import IrrigationControl from "./irrigationControl"
import PlanterEditableInformation from "./planterEditableInformation"
import PlanterInformation from "./planterInformation"

function PlanterDetailsPanel({ planterId }) {
    const { planterDetails, send, moistureHistory } = useIrrigation()
    const planter = planterDetails[planterId]
    const [editing, setEditing] = useState(false)
    const title = planter.title ? planter.title : planterId

    const triggerEditing = (e) => {
        e.preventDefault
        setEditing(!editing)
    }

    const moisturePercentage = () => {
        if (moistureHistory[planterId] != undefined) {
            const latestRecord = moistureHistory[planterId].at(-1)
            return `${latestRecord.moisturePercentage}%`
        } else if (planter != undefined) {
            return `${planter.moisturePercentage}%`
        }
        return "No reading available"
    }

    useEffect(() => {
        if (planter != undefined && moistureHistory[planterId] == undefined) {
            send(JSON.stringify({ id: planterId, messageType: "IRRIGATION_ARRAY_DATA", payload: null }))
            send(JSON.stringify({ id: planterId, messageType: "PLANTER_DATA", payload: planterId }))
        }
    }, [planter, moistureHistory, planterId, send])

    return (
        <Panel style={{ paddingTop: "1rem" }}>
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <h3>{title}</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <h3>{moisturePercentage()}</h3>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
            <Stack wrap spacing={12}>
                <IrrigationControl type="irrigate" />
                <IrrigationControl type="edit" onClick={triggerEditing} />
                <IrrigationControl type="away" />
                <IrrigationControl type="remove" />
            </Stack>
            <Divider />
            <FlexboxGrid>
                <PlanterEditableInformation planterId={planterId} editing={editing} onClose={triggerEditing} />
                <PlanterInformation planter={planter} />
            </FlexboxGrid>
            <Divider />
            <LineContainer>
                <IrrigationGraph planterId={planterId} />
            </LineContainer>
        </Panel>
    )
}

PlanterDetailsPanel.propTypes = {
    planterId: PropTypes.string,
}

export default PlanterDetailsPanel
