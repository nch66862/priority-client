import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
//just a container for a footer for completeness
export const Profile = () => {
    const { getProfile } = useContext(ProfileContext)
    const [userProfile, setUserProfile] = useState({})
    useEffect(() => {
        getProfile()
            .then(response => setUserProfile(response))
    }, [])
    return (
        <>
            <h1>Today</h1>
            <h4>{new Date().toLocaleDateString("en-US",
                {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: "UTC"
                })}
            </h4>
            <h2>{userProfile.priority.priority} is my priority</h2>
            <div>because {userProfile.priority.why}.</div>
            <div>
                HI
            </div>
        </>
    )
}