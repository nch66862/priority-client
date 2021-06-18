import React, { useContext } from "react"
import { Button } from 'reactstrap';
import { UserContext } from "../UserProvider";

export const SubscribeButton = (singleProfile={singleProfile}) => {
    const { changeSubscription } = useContext(UserContext)
    const toggleSubscription = () => {
        changeSubscription({
            creator_id: singleProfile.priority_user.id,
            subscribed: !singleProfile.priority_user.subscribed
        })
    }
    return (
        <Button onClick={toggleSubscription} disabled={singleProfile.priority_user.subscribed}>{singleProfile.priority_user.subscribed ? "Subscribed" : "+ Subscribe"}</Button>
    )
}