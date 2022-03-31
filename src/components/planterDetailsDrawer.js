import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import PlanterDetailsDisplay from "./planterDetailsPanel"
import { Drawer } from "rsuite"

function PlanterDetails({ plantId, toggle, setToggle }) {
    return (
        <Drawer full placement={"top"} open={toggle} onClose={() => setToggle(false)}>
            <Drawer.Body style={{ paddingLeft: "0.2rem", paddingRight: "0.5rem" }}>
                <PlanterDetailsDisplay plantId={plantId} />
            </Drawer.Body>
        </Drawer>
    )
}

PlanterDetails.propTypes = {
    plantId: PropTypes.string,
    toggle: PropTypes.bool,
    setToggle: PropTypes.func,
}

export default PlanterDetails
