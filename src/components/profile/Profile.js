import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button } from 'reactstrap';
import { HistoryForm } from "./HistoryForm";
import { What } from "./What";
import './Profile.css'

//just a container for a footer for completeness
export const Profile = () => {
    const { getProfile } = useContext(ProfileContext)
    const [userProfile, setUserProfile] = useState({})
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        getProfile()
            .then(response => setUserProfile(response))
        // eslint-disable-next-line
    }, [])
    return (
        <div className="profile">
            <What userProfile={userProfile} />
            <div>
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
                <h2>{userProfile.priority?.priority} is my priority</h2>
                <div>because {userProfile.priority?.why}.</div>
                <Button onClick={toggle}>Input Time</Button>
                {modal && <HistoryForm userProfile={userProfile} toggle={toggle} modal={modal} />}
            </div>
        </div>
    )
}