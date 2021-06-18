import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { ListGroup, ListGroupItem, Label, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { UserContext } from "./UserProvider";
import './Community.css'

export const SubscribeButton = (singleProfile={singleProfile}) => {
    const { getPublicProfiles, profiles } = useContext(UserContext)
    useEffect(() => {
        getPublicProfiles()
        // eslint-disable-next-line
    }, [])
    const toggleSubscription = () => {
        
    }
    return (
        <Button onClick={toggleSubscription} disabled={singleProfile.priority_user.subscribed}>{singleProfile.priority_user.subscribed ? "Subscribed" : "+ Subscribe"}</Button>
    )
}