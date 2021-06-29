import React, { createContext, useState } from "react";

export const AffirmationContext = createContext()

export const AffirmationProvider = (props) => {
    const [affirmations, setAffirmations] = useState([])
    const getAffirmations = (priorityId) => {
        return fetch(`http://localhost:8000/affirmations/${priorityId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setAffirmations(res))
    }
    const createAffirmation = (newAffirmation) => {
        return fetch(`http://localhost:8000/affirmations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(newAffirmation)
        })
            .then(() => getAffirmations(newAffirmation.priority_id))
    }
    const deleteAffirmation = (affirmationId, priorityId) => {
        return fetch(`http://localhost:8000/affirmations/${affirmationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(() => getAffirmations(priorityId))
    }
    return (
        <AffirmationContext.Provider value={{ getAffirmations, affirmations, setAffirmations, createAffirmation, deleteAffirmation }}>
            {props.children}
        </AffirmationContext.Provider>
    )
}