import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [profiles, setProfile] = useState([])
    const [loggedInUserId, setLoggedInUserId] = useState([])
    const logUserIn = (credentials) => {
        return fetch("http://localhost:8000/login",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
}
    const getPublicProfiles = () => {
        return fetch("http://localhost:8000/users",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setProfile)
    }
    const getUserById = (userId) =>{
        return fetch(`http://localhost:8000/users/${userId}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            }
        })
        .then(res => res.json())
    }
    const checkSubscribed = (authorId) => {
        return fetch("http://localhost:8000/users/subscription_status", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify({
                "author_id": authorId
            })
        })
            .then(res => res.json())
    }
    const changeSubscribed = (subscribing, subscription) => {
        return fetch("http://localhost:8000/users/subscription",{
            method: subscribing ? "POST" : "DELETE",
            // method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("priority_user_token")}`
            },
            body: JSON.stringify(subscription)
        })
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

    return (
        <UserContext.Provider value={{ 
            getPublicProfiles, profiles, getUserById, changeSubscribed, checkSubscribed, 
            checkAuthenticated,
            loggedInUserId, setLoggedInUserId, logUserIn }}>
            {props.children}
        </UserContext.Provider>
    )
}