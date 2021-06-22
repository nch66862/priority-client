import React, { createContext, useState } from "react";
import { format } from 'date-fns'

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
    const [whats, setWhats] = useState([])
    const [profile, setProfile] = useState({})
    const [myStatistics, setMyStatistics] = useState({})

    const getProfile = () => {
        return fetch("http://localhost:8000/users/my_profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setProfile(res))
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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(newWhat)
        })
            .then(() => getWhat())
    }
    const deleteWhat = (whatId) => {
        return fetch(`http://localhost:8000/what/${whatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(() => getWhat())
    }
    const submitHistory = (historyEvent) => {
        historyEvent.goal_date = format(historyEvent.goal_date, "yyyy-MM-dd")
        return fetch("http://localhost:8000/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(historyEvent)
        })
    }
    const changePrivacy = (profileIsPublic) => {
        return fetch("http://localhost:8000/users/change_privacy", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(profileIsPublic)
        })
            .then(res => res.json())
            .then(() => getProfile())
    }
    const updatePriority = (newPriority) => {
        return fetch(`http://localhost:8000/priority/${newPriority.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(newPriority)
        })
            .then(() => getProfile())
    }
    const getMyStatistics = () => {
        return fetch("http://localhost:8000/history", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setMyStatistics(res))
    }
    return (
        <ProfileContext.Provider value={{ getProfile, getWhat, submitHistory, whats, setWhats, deleteWhat, saveWhat, changePrivacy, updatePriority, profile, getMyStatistics, myStatistics }}>
            {props.children}
        </ProfileContext.Provider>
    )
}