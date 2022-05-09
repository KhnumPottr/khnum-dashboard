import React, { useState } from "react"
import PropTypes from "prop-types"
import { FlexboxGrid, Col, Input, DatePicker } from "rsuite"

function PlanterEditableInformation({ editing }) {
    const plantDate = new Date("2022-03-20")
    const styles = {
        marginBottom: 20,
    }

    return (
        <FlexboxGrid.Item as={Col} sm={24} md={12}>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                <strong>Date Planted:</strong>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                {editing ? (
                    <DatePicker calendarDefaultDate={plantDate} defaultValue={plantDate} block />
                ) : (
                    <span>2022-03-20</span>
                )}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                <strong>Moisture lower limit:</strong>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                {editing ? <Input defaultValue="15%" /> : <span>15%</span>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                <strong>Moisture upper limit:</strong>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                {editing ? <Input defaultValue="60%" /> : <span>60%</span>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={12} style={styles}>
                <strong>Plants:</strong>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} sx={12} style={styles}>
                {editing ? <Input defaultValue="Snap Dragons" block /> : <span>Snap Dragons</span>}
            </FlexboxGrid.Item>
        </FlexboxGrid.Item>
    )
}

PlanterEditableInformation.propTypes = {
    editing: PropTypes.bool,
}

export default PlanterEditableInformation
