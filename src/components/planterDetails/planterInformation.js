import React, { useState } from "react"
import { FlexboxGrid, Col } from "rsuite"

function PlanterInformation() {
    return (
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
    )
}

export default PlanterInformation
