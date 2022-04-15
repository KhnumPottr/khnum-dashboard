import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import IrrigationGraph from "../graphs/irrigationGraph"
import { LineContainer } from "../../styles/graphDisplays"
import { useIrrigation } from "../../connections/irrigationWebSocket"
import { Divider, Panel, FlexboxGrid, Col, Stack, Input } from "rsuite"
import IrrigationControl from "./irrigationControl"
import PlanterEditableInformation from "./planterEditableInformation"
import PlanterInformation from "./planterInformation"

function PlanterDetailsPanel({ plantId }) {
    const irrigationData = useIrrigation()
    const planter = irrigationData.nodes[plantId]
    const sendMessage = irrigationData.send

    const [editing, setEditing] = useState(false)

    const triggerEditing = (e) => {
        e.preventDefault
        setEditing(!editing)
    }

    useEffect(() => {
        if (planter != undefined && planter.data.length == 1) {
            sendMessage(JSON.stringify({ nodeName: plantId, messageType: "IRRIGATION_ARRAY_DATA", payload: null }))
        }
    }, [planter, plantId, sendMessage])

    return (
        <Panel style={{ paddingTop: "1rem" }}>
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} xs={12}>
                    {editing ? <Input size="lg" defaultValue={plantId} /> : <h3>{plantId}</h3>}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <h3>{planter.data[planter.data.length - 1].moisturePercentage}%</h3>
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
                <PlanterEditableInformation editing={editing} />
                <PlanterInformation />
            </FlexboxGrid>
            <Divider />
            <LineContainer>
                <IrrigationGraph planter={plantId} />
            </LineContainer>
        </Panel>
    )
}

PlanterDetailsPanel.propTypes = {
    plantId: PropTypes.string,
}

export default PlanterDetailsPanel
