import React from "react"
import PropTypes from "prop-types"
import { DoughnutContainer, Percentage } from "../styles/graphDisplays"
import DoughnutMoistureGraph from "./graphs/doughnutMoistureGraph"
import { Panel, FlexboxGrid, Col, Button } from "rsuite"

function PlanterSummaryCard({ plantId, onClick, percentage }) {
    return (
        <Panel shaded bodyFill header={plantId} style={{ display: "inline-block", maxWidth: "20rem", padding: "1rem" }}>
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
                    <Percentage>{percentage}</Percentage>
                    <DoughnutMoistureGraph planter={plantId} />
                </DoughnutContainer>
                <FlexboxGrid.Item as={Col} md={24}>
                    <Button appearance="primary" color="green" onClick={(e) => onClick(e, plantId)}>
                        Details
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    )
}

PlanterSummaryCard.propTypes = {
    plantId: PropTypes.string,
    onClick: PropTypes.func,
    percentage: PropTypes.number,
}

export default PlanterSummaryCard
