import React, { createContext } from "react";

export const ProfileContext = createContext()

export const ProfileProvider = (props) => {
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
    }
    return (
        <ProfileContext.Provider value={{ getProfile, getWhat }}>
            {props.children}
        </ProfileContext.Provider>
    )
}