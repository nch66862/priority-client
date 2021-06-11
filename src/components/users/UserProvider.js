import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [rareUsers, setUsers] = useState([])
    const [loggedInUserId, setLoggedInUserId] = useState([])
    const getAllUsers = () => {
        return fetch("https://nac-rare-server.herokuapp.com/users",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }
    const getInactiveUsers = () => {
        return fetch("https://nac-rare-server.herokuapp.com/users/inactive",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }
    const getUserById = (userId) =>{
        return fetch(`https://nac-rare-server.herokuapp.com/users/${userId}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }
    const updateUser = (updatedUser) => {
        return fetch(`https://nac-rare-server.herokuapp.com/users/${updatedUser.id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(updatedUser)
        })
    }
    // const getSubcriptions = (userId) => {
    //     return fetch(`https://nac-rare-server.herokuapp.com/subscriptions/${userId}`)
    //     .then(res => res.json())
    //     .then(res => console.log("subcriptions: ",res))
    // }
    const checkSubscribed = (authorId) => {
        return fetch("https://nac-rare-server.herokuapp.com/users/subscription_status", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "author_id": authorId
            })
        })
            .then(res => res.json())
    }
    const changeSubscribed = (subscribing, subscription) => {
        return fetch("https://nac-rare-server.herokuapp.com/users/subscription",{
            method: subscribing ? "POST" : "DELETE",
            // method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(subscription)
        })
    }
    const checkAuthenticated = () => {
        return fetch(`https://nac-rare-server.herokuapp.com/check-active`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }
    const changeAuthorStatus = (userId, action) => {
        return fetch(`https://nac-rare-server.herokuapp.com/change-active`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "action": action,
                "user_id": userId,
            })
        })
    }

    const getCurrentUser = () => {
        return fetch("https://nac-rare-server.herokuapp.com/users/user_profile",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const subscriberCount = () => {
        return fetch("https://nac-rare-server.herokuapp.com/users/subscriber_count",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const changeRank = (updatedUser) => {
        return fetch(`https://nac-rare-server.herokuapp.com/change-rank`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(updatedUser)
        })
    }

    const deleteUser = (userId) => {
        return fetch(`https://nac-rare-server.herokuapp.com/users/${userId}`,{
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        })
        .then(() => getAllUsers())
    }

    return (
        <UserContext.Provider value={{ getAllUsers, rareUsers, getUserById, changeSubscribed, checkSubscribed, changeAuthorStatus, checkAuthenticated, getInactiveUsers, getCurrentUser, updateUser, changeRank, loggedInUserId, setLoggedInUserId, subscriberCount, deleteUser }}>
            {props.children}
        </UserContext.Provider>
    )
}