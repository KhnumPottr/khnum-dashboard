import React from "react"
import { FlexboxGrid, Col, Tag } from "rsuite"
import PropTypes from "prop-types"

function PlanterInformation({ planter }) {
    const { datePlanted, irrigating, lowerLimit, upperLimit, plants } = planter
    const isIrrigating = irrigating ? <Tag color="green">In Progress</Tag> : <Tag>Not Irrigating</Tag>

    const plantDate = () => {
        if (datePlanted) {
            return (
                <span>{datePlanted.toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" })}</span>
            )
        }
        return <span>No date provided</span>
    }

    const age = () => {
        if (datePlanted) {
            const timeDiff = new Date() - datePlanted
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
            return <span>{dayDiff} days</span>
        }
        return <span>No plant date recorded</span>
    }
    return (
        <FlexboxGrid.Item as={Col} xs={24} sm={24}>
            <FlexboxGrid.Item as={Col} xs={24} sm={24} md={12}>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Date Planted:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    {plantDate()}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Moisture lower limit:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <span>{lowerLimit ? `${lowerLimit}%` : "No lower limit provided"}</span>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Moisture upper limit:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <span>{upperLimit ? `${upperLimit}%` : "No upper limit provided"}</span>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Plants:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <span>{plants}</span>
                </FlexboxGrid.Item>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} xs={24} sm={24} md={12}>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Age:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    {age()}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <strong>Irrigation Status:</strong>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} xs={12}>
                    <span>{isIrrigating}</span>
                </FlexboxGrid.Item>
            </FlexboxGrid.Item>
        </FlexboxGrid.Item>
    )
}

PlanterInformation.propTypes = {
    planter: PropTypes.object,
}

export default PlanterInformation
