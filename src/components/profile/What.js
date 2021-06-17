import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, ListGroup, ListGroupItem, Input } from 'reactstrap';

export const What = ({ userProfile }) => {
    const { getWhat, saveWhat, deleteWhat, whats } = useContext(ProfileContext)
    const [editMode, setEditMode] = useState(false)
    const [what, setWhat] = useState({
        what: "",
        priority_id: userProfile.priority?.id
    })
    useEffect(() => {
        getWhat()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        let newWhat = { ...what }
        newWhat.priority_id = userProfile.priority?.id
        setWhat(newWhat)
        // eslint-disable-next-line
    }, [userProfile])
    const toggleEditMode = () => setEditMode(!editMode)
    const handleInputChange = (event) => {
        let newWhat = { ...what }
        newWhat.what = event.target.value
        setWhat(newWhat)
    }
    const handleDeleteWhat = (event) => {
        deleteWhat(event.target.id)
    }
    const handleSubmitWhat = () => {
        saveWhat(what)
    }
    return (
        <div>
            <div className="whatHeader">
                <h3>What will I prioritize?</h3>
                <Button color="secondary" onClick={toggleEditMode}>{editMode ? "Done" : "Edit"}</Button>
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
                    <Input onChange={handleInputChange} value={what.what} id="what" type="text" name="what" />
                    <Button onClick={handleSubmitWhat}>Save</Button>
                </>
            )}
        </div>
    )
}