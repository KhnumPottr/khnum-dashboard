import React, { useState } from "react"
import { useIrrigation } from "../connections/irrigationWebSocket"
import DoughnutMoistureGraph from "./graphs/doughnutMoistureGraph"
import PlanterDetails from "./planterDetails"
import { DoughnutContainer, Percentage } from "../styles/graphDisplays"
import { Stack, Panel, FlexboxGrid, Col, Button, Placeholder } from "rsuite"

function PlanterSummaryDisplay() {
    const planterNodes = useIrrigation().nodes
    const [open, setOpen] = useState(false)
    const [plantId, setPlantId] = useState("empty")

    const showPlantDetails = (e, plantId) => {
        e.preventDefault()
        setOpen(true)
        setPlantId(plantId)
    }

    if (planterNodes.length === 1) return <Placeholder style={{ marginTop: 30 }} rows={5} graph="image" active />

    return (
        <div>
            <Stack wrap spacing={12} justifyContent={"center"}>
                {Object.keys(planterNodes).map((key) => {
                    return (
                        <Panel
                            shaded
                            bodyFill
                            header={key}
                            key={key}
                            style={{ display: "inline-block", maxWidth: "20rem", padding: "1rem" }}
                        >
                            <FlexboxGrid>
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
                                <FlexboxGrid.Item as={Col} sx={12}>
                                    <strong>Plants:</strong>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item as={Col} sx={12}>
                                    <span>Flowers, Tomatoes, Beans</span>
                                </FlexboxGrid.Item>
                                <DoughnutContainer>
                                    <Percentage>
                                        {planterNodes[key].data[planterNodes[key].data.length - 1].moisturePercentage}
                                    </Percentage>
                                    <DoughnutMoistureGraph planter={key} />
                                </DoughnutContainer>
                                <FlexboxGrid.Item as={Col} md={24}>
                                    <Button
                                        appearance="primary"
                                        color="green"
                                        onClick={(event) => showPlantDetails(event, key)}
                                    >
                                        Details
                                    </Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Panel>
                    )
                })}
            </Stack>
            <PlanterDetails plantId={plantId} toggle={open} setToggle={setOpen} />
        </div>
    )
}

export default PlanterSummaryDisplay
