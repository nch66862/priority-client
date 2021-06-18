import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../ProfileProvider"
import { Button, ListGroup, ListGroupItem, Input, Modal, ModalBody } from 'reactstrap';
import { useParams } from "react-router-dom";

export const What = ({ profile }) => {
    const { profileId } = useParams()
    const { getWhat, saveWhat, deleteWhat, whats } = useContext(ProfileContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteWhatError, setDeleteWhatError] = useState(false)
    const [what, setWhat] = useState({
        what: "",
        priority_id: profile.priority?.id
    })
    useEffect(() => {
        getWhat()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        let newWhat = { ...what }
        newWhat.priority_id = profile.priority?.id
        setWhat(newWhat)
        // eslint-disable-next-line
    }, [profile])
    const toggleEditMode = () => setEditMode(!editMode)
    const toggleDeleteWhatError = () => setDeleteWhatError(!deleteWhatError)
    const handleInputChange = (event) => {
        let newWhat = { ...what }
        newWhat.what = event.target.value
        setWhat(newWhat)
    }
    const handleDeleteWhat = (event) => {
        if (whats.length > 1) {
            deleteWhat(event.target.id)
        } else {
            toggleDeleteWhatError()
        }
    }
    const handleSubmitWhat = () => {
        saveWhat(what)
            .then(() => setWhat({
                what: "",
                priority_id: profile.priority?.id
            }))
    }
    return (
        <div>
            <Modal isOpen={deleteWhatError} toggle={toggleDeleteWhatError}>
                <ModalBody>
                    <h4>You need at least one way to reach your goal</h4>
                    <Button color="secondary" onClick={toggleDeleteWhatError}>OK</Button>
                </ModalBody>
            </Modal>
            <div className="whatHeader">
                <h3>What will I prioritize?</h3>
                {!profileId && <Button color="secondary" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</Button>}
            </div>
            <ListGroup>
                {whats.map(singleWhat => {
                    return (
                        <div key={singleWhat.id} className="whatItem">
                            <ListGroupItem key={singleWhat.id} >{singleWhat.what}</ListGroupItem>
                            {editMode && <Button id={singleWhat.id} color="danger" onClick={handleDeleteWhat}>Delete</Button>}
                        </div>
                    )
                })}
            </ListGroup>
            {editMode && (
                <>
                    <Input onChange={handleInputChange} value={what.what} id="what" type="text" name="what" placeholder="type an activity"/>
                    <Button onClick={handleSubmitWhat}>Save</Button>
                </>
            )}
        </div>
    )
}