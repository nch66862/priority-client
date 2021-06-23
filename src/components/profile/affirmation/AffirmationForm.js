import React, { useContext, useEffect, useState } from "react"
import { Button, Input } from 'reactstrap';
import { AffirmationContext } from "./AffirmationProvider";

export const AffirmationForm = ({ publicProfile }) => {
    const { createAffirmation } = useContext(AffirmationContext)
    const [affirmation, setAffirmation] = useState({
        affirmation: "",
        priority_id: publicProfile.priority?.id
    })
    useEffect(() => {
        if (publicProfile.priority) {
            let newAffirmation = { ...affirmation }
            newAffirmation.priority_id = publicProfile.priority.id
            setAffirmation(newAffirmation)
        }
        // eslint-disable-next-line
    }, [publicProfile])
    const handleInputChange = (event) => {
        let newAffirmation = { ...affirmation }
        newAffirmation.affirmation = event.target.value
        setAffirmation(newAffirmation)
    }
    const handleSubmitAffirmation = () => {
        createAffirmation(affirmation)
            .then(() => setAffirmation({
                affirmation: "",
                priority_id: publicProfile.priority?.id
            }))
    }
    return (
        <div>
            <Input onChange={handleInputChange} value={affirmation.affirmation} id="affirmation" type="text" name="affirmation" placeholder="write an affirmation" />
            <Button color="primary" onClick={handleSubmitAffirmation}>Post</Button>
        </div>
    )
}