import React from "react"
import PropTypes from "prop-types"
import { DoughnutContainer, Percentage } from "../../styles/graphDisplays"
import DoughnutMoistureGraph from "../graphs/doughnutMoistureGraph"
import { Panel, FlexboxGrid, Col, Button, Tag } from "rsuite"

function PlanterSummaryCard({ planter, onClick }) {
    const { planterId, title, irrigating, moisturePercentage } = planter
    const planterTitle = title ? title : planterId
    const isIrrigating = irrigating ? <Tag color="green">In Progess</Tag> : <Tag>Not Irrigating</Tag>
    return (
        <Panel shaded bodyFill style={{ display: "inline-block", maxWidth: "20rem", padding: "1rem" }}>
            <FlexboxGrid>
                <FlexboxGrid.Item as={Col} xs={24}>
                    <h3>{planterTitle}</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} sx={12}>
                    <strong>Irrigation:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} sx={12}>
                    {isIrrigating}
                </FlexboxGrid.Item>
                <DoughnutContainer>
                    <Percentage>{moisturePercentage}</Percentage>
                    <DoughnutMoistureGraph planter={planterId} percentage={moisturePercentage} />
                </DoughnutContainer>
                <FlexboxGrid.Item as={Col} md={24}>
                    <Button appearance="primary" color="green" onClick={(e) => onClick(e, planterId)}>
                        Details
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    )
}

PlanterSummaryCard.propTypes = {
    plantId: PropTypes.string,
    planter: PropTypes.object,
    onClick: PropTypes.func,
}

export default PlanterSummaryCard
