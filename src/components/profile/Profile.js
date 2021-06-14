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
        <div>
            HI
        </div>
    )
}