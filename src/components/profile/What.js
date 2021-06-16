import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, ListGroup, ListGroupItem, Input } from 'reactstrap';

export const What = ({ userProfile }) => {
    const { getWhat, submitWhat } = useContext(ProfileContext)
    const [whats, setWhats] = useState([])
    const [showNewWhat, setShowNewWhat] = useState(false)
    const [what, setWhat] = useState({
        what: "",
        priority_id: userProfile.priority?.id
    })
    useEffect(() => {
        getWhat()
            .then(response => setWhats(response))
    }, [])
    const handleAddWhat = (whatId) => {
        let newHistoryEvent = { ...what }
        newHistoryEvent.what_id = whatId
        setWhat(newHistoryEvent)
    }
    const handleInputChange = (datetime) => {
        let newHistoryEvent = { ...what }
        newHistoryEvent.goal_date = datetime
        setWhat(newHistoryEvent)
    }
    const handleDeleteWhat = (datetime) => {
        let newHistoryEvent = { ...what }
        newHistoryEvent.goal_date = datetime
        setWhat(newHistoryEvent)
    }
    const handleSubmitWhat = () => {
        submitWhat(what)
    }
    return (
        <>
            <h3>What will I prioritize?</h3>
            <Button color="secondary" onClick={handleAddWhat}> + </Button>
            <ListGroup>
                {whats.map(singleWhat => {
                    return (
                        <>
                            <ListGroupItem key={singleWhat.id}>{singleWhat.what}</ListGroupItem>
                            <Button color="danger" onClick={handleDeleteWhat}>Delete</Button>
                        </>
                    )
                })}
            </ListGroup>
            {showNewWhat && (
                <>
                    <Input onChange={handleInputChange} value={what.what} id="what" type="text" name="what" />
                    <Button color="danger" onClick={handleDeleteWhat}>Delete</Button>
                </>
            )}
        </>
    )
}