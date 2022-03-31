import React, { useEffect } from "react"
import PropTypes from "prop-types"
import IrrigationGraph from "./graphs/irrigationGraph"
import { LineContainer } from "../styles/graphDisplays"
import { useIrrigation } from "../connections/irrigationWebSocket"
import { Divider, Panel, FlexboxGrid, Col, Stack, IconButton } from "rsuite"
import { MdOutlineWaterDrop, MdWaterDrop, MdModeEdit, MdRemoveCircle } from "react-icons/md"
import { GiNightSleep } from "react-icons/gi"

function PlanterDetailsPanel({ plantId }) {
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
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <h3>{plantId}</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <h3>{planter.data[planter.data.length - 1].moisturePercentage}%</h3>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
            <Stack wrap spacing={12}>
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="blue"
                    icon={<MdOutlineWaterDrop />}
                    accessibilityLabel={"trigger irrigation"}
                />
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="yellow"
                    icon={<MdWaterDrop />}
                    accessibilityLabel={"trigger irrigation"}
                />
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="green"
                    icon={<MdModeEdit />}
                    accessibilityLabel={"edit planter"}
                />
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="violet"
                    icon={<GiNightSleep />}
                    accessibilityLabel={"sleep and away mode"}
                />
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="red"
                    icon={<MdRemoveCircle />}
                    accessibilityLabel={"remove planter"}
                />
            </Stack>
            <Divider />
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} sm={24} md={12}>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Date Planted:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <span>2022-03-20</span>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Moisture lower limit:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        15%
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Moisture upper limit:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        60%
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Plants:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} sx={12}>
                        <span>Snap Dragons</span>
                    </FlexboxGrid.Item>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} sm={24} md={12}>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Age:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <span>76 Days</span>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <strong>Days till next watering:</strong>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} xs={12}>
                        <span>14 days</span>
                    </FlexboxGrid.Item>
                </FlexboxGrid.Item>
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
