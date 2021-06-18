import React, { useContext, useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, Button, Input, Form, FormGroup } from "reactstrap"
import { ProfileContext } from "../../profile/ProfileProvider";

export const PriorityModal = ({ priorityModal, togglePriorityModal }) => {
    const { getProfile, updatePriority, profile } = useContext(ProfileContext)
    const [editedPriority, setEditedPriority] = useState({
        priority: "",
        why: "",
        how: ""
    });
    const handleUpdateField = (event) => {
        let newPriority = { ...editedPriority }
        newPriority[event.target.name] = event.target.value
        setEditedPriority(newPriority)
    }
    const handleSubmitEdit = (event) => {
        event.preventDefault()
        updatePriority(editedPriority)
            .then(() => togglePriorityModal())
    }
    useEffect(() => {
        getProfile()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setEditedPriority(profile.priority)
        // eslint-disable-next-line
    }, [profile])
    return (
        <>
            <Modal isOpen={priorityModal} toggle={togglePriorityModal}>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <h3>My Priority is <Input name="priority" type="text" onChange={handleUpdateField} value={editedPriority?.priority} /></h3>
                        </FormGroup>
                        <FormGroup>
                            <h6>because <Input name="why" type="text" onChange={handleUpdateField} value={editedPriority?.why} /></h6>
                        </FormGroup>
                        <FormGroup>
                            <h6>it is my aim to spend <Input name="how" type="number" max="480" min="5" step="5" onChange={handleUpdateField} value={editedPriority?.how} /> minutes a day on my priority</h6>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleSubmitEdit}>Save</Button>
                    <Button color="secondary" onClick={togglePriorityModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
