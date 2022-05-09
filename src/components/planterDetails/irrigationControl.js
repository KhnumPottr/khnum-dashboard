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
                        aria-label={"trigger irrigation"}
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
                    aria-label={"trigger irrigation"}
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
                    aria-label={"edit planter"}
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
                    aria-label={"sleep and away mode"}
                />
            )
        case "remove":
            return (
                <IconButton
                    size="lg"
                    appearance="primary"
                    color="red"
                    icon={<MdRemoveCircle />}
                    aria-label={"remove planter"}
                />
            )
    }
}

IrrigationControl.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default IrrigationControl
