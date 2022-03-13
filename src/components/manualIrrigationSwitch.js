import React from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import { SuccessButton } from "../styles/input"
import { Section, Card, CardButtons } from "../styles/layout"
import { Label, Value } from "../styles/text"

function ManualIrrigationSwitch() {
    const irrigationData = useIrrigation()
    const irrigation = useIrrigation()["irrigationState"]
    const sendMessage = irrigationData.send

    const onClick = (e) => {
        e.preventDefault()
        const payload = irrigation ? false : true
        sendMessage(JSON.stringify({ nodeName: "irrigationController", messageType: "SWITCH", payload }))
    }

    return (
        <Section>
            <Card>
                <Label>Irrigation Status</Label>
                {irrigation ? <Value>On</Value> : <Value>Off</Value>}
                <CardButtons>
                    <SuccessButton onClick={(event) => onClick(event)}>Toggle</SuccessButton>
                </CardButtons>
            </Card>
        </Section>
    )
}

export default ManualIrrigationSwitch
