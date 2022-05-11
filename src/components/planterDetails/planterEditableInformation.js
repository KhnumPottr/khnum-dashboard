import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { DatePicker, Form, Button, Modal, InputNumber } from "rsuite"
import { useIrrigation } from "../../connections/irrigationWebSocket"

function PlanterEditableInformation({ planterId, editing, onClose }) {
    const { planterDetails, send } = useIrrigation()
    const { title, upperLimit, lowerLimit, plants, datePlanted } = planterDetails[planterId]
    const displayTitle = title ? title : planterId
    const [formValue, setFormValue] = useState({})

    useEffect(() => {
        setFormValue({
            planterId: planterId,
            title: title ? title : null,
            datePlanted: datePlanted ? datePlanted : new Date(),
            upperLimit: upperLimit ? upperLimit.toString() : null,
            lowerLimit: lowerLimit ? lowerLimit.toString() : null,
            plants: plants ? plants : null,
        })
    }, [planterId, title, upperLimit, lowerLimit, plants, datePlanted])

    const handleSubmit = () => {
        const date = new Date(formValue.datePlanted)
        const dateFixed = new Date(date.setHours(date.getHours() - date.getTimezoneOffset() / 60))
        send(
            JSON.stringify({
                id: planterId,
                messageType: "UPDATE_PLANTER_DATA",
                payload: { ...formValue, datePlanted: dateFixed },
            })
        )
    }

    return (
        <Modal open={editing} backdrop={"static"} onClose={onClose} size="xs">
            <Modal.Header>
                <Modal.Title>Edit {displayTitle}</Modal.Title>
            </Modal.Header>
            <Form fluid onChange={setFormValue} formValue={formValue} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="title-1">
                        <Form.ControlLabel>Title</Form.ControlLabel>
                        <Form.Control name="title" />
                    </Form.Group>
                    <Form.Group controlId="datePlanted-2">
                        <Form.ControlLabel>Date Planted</Form.ControlLabel>
                        <Form.Control name="datePlanted" accepter={DatePicker} />
                    </Form.Group>
                    <Form.Group controlId="upperLimit-2">
                        <Form.ControlLabel>Upper Limit</Form.ControlLabel>
                        <Form.Control name="upperLimit" type="number" accepter={InputNumber} />
                    </Form.Group>
                    <Form.Group controlId="lowerLimit-3">
                        <Form.ControlLabel>Lower Limit</Form.ControlLabel>
                        <Form.Control name="lowerLimit" accepter={InputNumber} />
                    </Form.Group>
                    <Form.Group controlId="plants-6">
                        <Form.ControlLabel>Plants</Form.ControlLabel>
                        <Form.Control name="plants" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} type="submit" appearance="primary">
                        Submit
                    </Button>
                    <Button onClick={onClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

PlanterEditableInformation.propTypes = {
    editing: PropTypes.bool,
    planterId: PropTypes.string,
    onClose: PropTypes.func,
}

export default PlanterEditableInformation
