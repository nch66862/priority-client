import React, { createContext, useState } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [whats, setWhats] = useState([])
    const getProfile = () => {
        return fetch("http://localhost:8000/users/my_profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
    }
    const getWhat = () => {
        return fetch("http://localhost:8000/what", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setWhats(res))
    }
    const saveWhat = (newWhat) => {
        return fetch("http://localhost:8000/what", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(newWhat)
        })
            .then(() => getWhat())
    }
    const deleteWhat = (whatId) => {
        return fetch(`http://localhost:8000/what${whatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(() => getWhat())
    }
    const submitHistory = (historyEvent) => {
        return fetch("http://localhost:8000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(historyEvent)
        })
    }
    return (
        <ProfileContext.Provider value={{ getProfile, getWhat, submitHistory, whats, setWhats, deleteWhat, saveWhat }}>
            {props.children}
        </ProfileContext.Provider>
    )
}