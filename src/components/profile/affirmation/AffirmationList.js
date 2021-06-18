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
        deleteAffirmation(event.target.id, profile.priority.id)
    }
    return (
        <div>
            <h3>Affirmations</h3>
            {profile.priority?.is_public || profileId ? (
                <>
                    <ListGroup>
                        {affirmations.length ? affirmations.map(affirmation => {
                            return (
                                <div key={affirmation.id} className="whatItem">
                                    <ListGroupItem key={affirmation.id} >
                                        <div>{affirmation.affirmation}</div>
                                        <div>-{affirmation.priority_user.user.first_name}</div>
                                    </ListGroupItem>
                                    {affirmation.is_author && <Button id={affirmation.id} color="danger" onClick={handleDeleteAffirmation}>Delete</Button>}
                                </div>
                            )
                        }) : <div>No affirmations yet</div>}
                    </ListGroup>
                    {profileId && <AffirmationForm profile={profile} />}
                </>
            )
                :
                <div>Change your profile to public to view affirmations</div>
            }
        </div>
    )
}