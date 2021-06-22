import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [profiles, setProfiles] = useState([])
    const [publicProfile, setPublicProfile] = useState({})
    const [userStatistics, setUserStatistics] = useState({})
    const [userWhats, setUserWhats] = useState([])
    const logUserIn = (credentials) => {
        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
    }
    const getPublicProfiles = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setProfiles)
    }
    const getSubscriptions = () => {
        return fetch("http://localhost:8000/users/subscriptions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setProfiles)
    }
    const getProfileById = (profileId) => {
        return fetch(`http://localhost:8000/users/${profileId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
        .then(res => setPublicProfile(res))
    }
    const checkAuthenticated = () => {
        return fetch(`http://localhost:8000/check-active`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
    }
    const changeSubscription = (subscription) => {
        return fetch("http://localhost:8000/subscriptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(subscription)
        })
            .then(() => getPublicProfiles())
    }
    const getUserStatistics = (profileId) => {
        return fetch(`http://localhost:8000/history/${profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setUserStatistics(res))
    }
    const getWhatById = (profileId) => {
        return fetch(`http://localhost:8000/what/${profileId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
            .then(res => res.json())
            .then(res => setUserWhats(res))
    }
    return (
        <UserContext.Provider value={{
            getPublicProfiles, profiles,
            checkAuthenticated, getSubscriptions,
            logUserIn, getProfileById,
            publicProfile, changeSubscription,
            getUserStatistics, userStatistics,
            getWhatById, userWhats
        }}>
            {props.children}
        </UserContext.Provider>
    )
}