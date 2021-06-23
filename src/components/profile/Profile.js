import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button } from 'reactstrap';
import { HistoryForm } from "./history/HistoryForm";
import { What } from "./what/What";
import './Profile.css'
import { useParams } from "react-router-dom";
import { AffirmationList } from './affirmation/AffirmationList'
import { UserContext } from "../users/UserProvider";
import { Statistics } from "./Statistics/Statistics";

//just a container for a footer for completeness
export const Profile = () => {
    const { profileId } = useParams()
    const { getProfile, profile } = useContext(ProfileContext)
    const { getProfileById, publicProfile } = useContext(UserContext)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        if (profileId){
            getProfileById(profileId)
        } else {
            getProfile()
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className="profile">
            <What profile={profile} />
            <div className="profileSection">
                <h1>Today</h1>
                <h4>{new Date().toLocaleDateString("en-US",
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: "CST"
                    })}
                </h4>
                <h2>{profileId ? publicProfile.priority?.priority : profile.priority?.priority} is {profileId ? `${publicProfile.user?.user.first_name}'s` : "my"} priority</h2>
                <div>because {profileId ? `${publicProfile.priority?.why}` : `${profile.priority?.why}`}</div>
                {!profileId && <Button color="primary" className="inputTimeButton" onClick={toggle}>Input Time</Button>}
                {modal && <HistoryForm profile={profile} toggle={toggle} modal={modal} />}
                <Statistics />
            </div>
            <AffirmationList profile={profile} publicProfile={publicProfile} />
        </div>
    )
}