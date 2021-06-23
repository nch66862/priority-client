import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../ProfileProvider"
import { Button, Input, Modal, ModalBody } from 'reactstrap';
import { useParams } from "react-router-dom";
import { UserContext } from "../../users/UserProvider";
import './What.css'

export const What = ({ profile }) => {
    const { profileId } = useParams()
    const { getWhat, saveWhat, deleteWhat, whats } = useContext(ProfileContext)
    const { getWhatById, userWhats } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteWhatError, setDeleteWhatError] = useState(false)
    const [what, setWhat] = useState({
        what: "",
        priority_id: profile.priority?.id
    })
    useEffect(() => {
        if (profileId) {
            getWhatById(profileId)
        } else {
            getWhat()
        }
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
        <div className="whatSection">
            <Modal isOpen={deleteWhatError} toggle={toggleDeleteWhatError}>
                <ModalBody>
                    <h4>You need at least one way to reach your goal</h4>
                    <Button color="secondary" onClick={toggleDeleteWhatError}>OK</Button>
                </ModalBody>
            </Modal>
            <div className="whatHeader">
                <h3>What will I prioritize?</h3>
                {!profileId && <Button className="editWhatButton" color="secondary" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</Button>}
            </div>
            <section className="orderedListOfWhats">
                {profileId ? (
                    userWhats.map(singleWhat => {
                        return (
                            <article key={singleWhat.id} className="whatItem">
                                <div className="listGroupItem" key={singleWhat.id} >{singleWhat.what}</div>
                            </article>
                        )
                    })
                ) : (
                    whats.map(singleWhat => {
                        return (
                            <article key={singleWhat.id} className="whatItem">
                                <div className="listGroupItem" key={singleWhat.id} >{singleWhat.what}</div>
                                {editMode && <Button className="deleteWhatButton" id={singleWhat.id} color="danger" onClick={handleDeleteWhat}>Delete</Button>}
                            </article>
                        )
                    })
                )
                }
            </section>
            {editMode && (
                <>
                    <Input onChange={handleInputChange} value={what.what} id="what" type="text" name="what" placeholder="type an activity" />
                    <Button color="primary" onClick={handleSubmitWhat}>Save</Button>
                </>
            )}
        </div>
    )
}