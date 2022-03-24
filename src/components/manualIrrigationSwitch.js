import React from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import { Stack, Panel, FlexboxGrid, Col, Button, Placeholder, Divider } from "rsuite"

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
        <FlexboxGrid justify="center" style={{ padding: "1rem" }}>
            <FlexboxGrid.Item as={Col} sx={24}>
                <Stack divider={<Divider vertical />}>
                    <FlexboxGrid>
                        <FlexboxGrid.Item as={Col} sx={12}>
                            <strong>Irrigation Status</strong>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item as={Col} sx={12}>
                            {irrigation ? <span>On</span> : <span>Off</span>}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <Button appearance="primary" color="blue" onClick={(event) => onClick(event)}>
                        Toggle
                    </Button>
                </Stack>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    )
}

export default ManualIrrigationSwitch
