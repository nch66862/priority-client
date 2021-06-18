import React, { useContext, useEffect } from "react"
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useParams } from "react-router-dom";
import { AffirmationContext } from "./AffirmationProvider";
import { AffirmationForm } from "./AffirmationForm";

export const AffirmationList = ({ profile }) => {
    const { profileId } = useParams()
    const { getAffirmations, deleteAffirmation, affirmations } = useContext(AffirmationContext)
    useEffect(() => {
        if (profile.priority) {
            getAffirmations(profile.priority.id)
        }
        // eslint-disable-next-line
    }, [profile])
    const handleDeleteAffirmation = (event) => {
        deleteAffirmation(event.target.id)
    }
    return (
        <div>
            <h3>Affirmations</h3>
            <ListGroup>
                {affirmations.map(affirmation => {
                    return (
                        <div key={affirmation.id} className="whatItem">
                            <ListGroupItem key={affirmation.id} >{affirmation.what}</ListGroupItem>
                            {<Button id={affirmation.id} color="danger" onClick={handleDeleteAffirmation}>Delete</Button>}
                        </div>
                    )
                })}
            </ListGroup>
            {profileId && <AffirmationForm profile={profile} />}
        </div>
    )
}