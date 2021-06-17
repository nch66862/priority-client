import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button } from 'reactstrap';
import { HistoryForm } from "./history/HistoryForm";
import { What } from "./what/What";
import './Profile.css'
import { useParams } from "react-router-dom";

//just a container for a footer for completeness
export const Profile = () => {
    const { profileId } = useParams()
    const { getProfile, profile } = useContext(ProfileContext)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        getProfile()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="profile">
            <What profile={profile} />
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
                {console.log(profile)}
                <h2>{profile.priority?.priority} is my priority</h2>
                <div>because {profile.priority?.why}.</div>
                {!profileId && <Button onClick={toggle}>Input Time</Button>}
                {modal && <HistoryForm profile={profile} toggle={toggle} modal={modal} />}
            </div>
        </div>
    )
}