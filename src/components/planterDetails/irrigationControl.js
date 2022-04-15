import React, { useState } from "react"
import PropTypes from "prop-types"
import { IconButton } from "rsuite"
import { MdOutlineWaterDrop, MdWaterDrop, MdModeEdit, MdRemoveCircle } from "react-icons/md"
import { GiNightSleep } from "react-icons/gi"

function IrrigationControl({ type, onClick }) {
    const [isIrrigating, setIsIrrigating] = useState(false)

    const triggerIrrigation = (e) => {
        e.preventDefault
        setIsIrrigating(!isIrrigating)
    }

    switch (type) {
        case "irrigate":
            if (isIrrigating) {
                return (
                    <IconButton
                        size="lg"
                        appearance="primary"
                        color="yellow"
                        icon={<MdWaterDrop />}
                        accessibilitylabel={"trigger irrigation"}
                        onClick={(e) => triggerIrrigation(e)}
                    />
                )
            }
            return (
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="blue"
                    icon={<MdOutlineWaterDrop />}
                    accessibilitylabel={"trigger irrigation"}
                    onClick={(e) => triggerIrrigation(e)}
                />
            )
        case "edit":
            return (
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="green"
                    icon={<MdModeEdit />}
                    accessibilitylabel={"edit planter"}
                    onClick={(e) => onClick(e)}
                />
            )
        case "away":
            return (
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="violet"
                    icon={<GiNightSleep />}
                    accessibilitylabel={"sleep and away mode"}
                />
            )
        case "remove":
            return (
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="red"
                    icon={<MdRemoveCircle />}
                    accessibilitylabel={"remove planter"}
                />
            )
    }
}

IrrigationControl.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default IrrigationControl
