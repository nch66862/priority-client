import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, ListGroup, ListGroupItem, Input } from 'reactstrap';

export const What = ({ userProfile }) => {
    const { getWhat, saveWhat, deleteWhat, whats, setWhats } = useContext(ProfileContext)
    const [showNewWhat, setShowNewWhat] = useState(false)
    const [what, setWhat] = useState({
        what: "",
        priority_id: userProfile.priority?.id
    })
    useEffect(() => {
        getWhat()
    }, [])
    const handleAddWhat = () => {
        setShowNewWhat(true)
    }
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
            .then(() => setShowNewWhat(false))
    }
    const handleCloseForm = () => {
        setShowNewWhat(false)
    }
    return (
        <>
            <h3>What will I prioritize?</h3>
            <Button color="secondary" onClick={handleAddWhat}> + </Button>
            <ListGroup>
                {whats.map(singleWhat => {
                    return (
                        <div key={singleWhat.id}>
                            <ListGroupItem key={singleWhat.id} >{singleWhat.what}</ListGroupItem>
                            <Button id={singleWhat.id} color="danger" onClick={handleDeleteWhat}>Delete</Button>
                        </div>
                    )
                })}
            </ListGroup>
            {showNewWhat && (
                <>
                    <Input onChange={handleInputChange} value={what.what} id="what" type="text" name="what" />
                    <Button onClick={handleSubmitWhat}>Save</Button>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                </>
            )}
        </>
    )
}