import React, { useContext, useEffect } from "react"
import { Button } from 'reactstrap';
import { useParams } from "react-router-dom";
import { AffirmationContext } from "./AffirmationProvider";
import { AffirmationForm } from "./AffirmationForm";
import './Affirmation.css'

export const AffirmationList = ({ profile, publicProfile }) => {
    const { profileId } = useParams()
    const { getAffirmations, deleteAffirmation, affirmations } = useContext(AffirmationContext)
    useEffect(() => {
        if (profileId) {
            if (publicProfile.priority) {
                getAffirmations(publicProfile.priority.id)
            }
        }
        else if (profile.priority) {
            getAffirmations(profile.priority.id)
        }
        // eslint-disable-next-line
    }, [profile, publicProfile])
    const handleDeleteAffirmation = (event) => {
        if (profileId) {
            deleteAffirmation(event.target.id, publicProfile.priority.id)
        } else {
            deleteAffirmation(event.target.id, profile.priority.id)
        }
    }
    return (
        <div className="affirmationSection">
            <h3>Affirmations</h3>
            {profile.priority?.is_public || profileId ? (
                <>
                    <section>
                        {affirmations.length ? affirmations.map(affirmation => {
                            return (
                                <div key={affirmation.id} className="whatItem">
                                    <article key={affirmation.id} >
                                        <div>{affirmation.affirmation}</div>
                                        <div>-{affirmation.priority_user.user.first_name}</div>
                                    </article>
                                    {affirmation.is_author && <Button id={affirmation.id} color="danger" onClick={handleDeleteAffirmation}>Delete</Button>}
                                </div>
                            )
                        }) : <div>No affirmations yet</div>}
                    </section>
                    {profileId && <AffirmationForm publicProfile={publicProfile} />}
                </>
            )
                :
                <div>Change your profile to public to view affirmations</div>
            }
        </div>
    )
}