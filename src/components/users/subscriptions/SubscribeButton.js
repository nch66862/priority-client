import React, { useContext } from "react"
import { Button } from 'reactstrap';
import { UserContext } from "../UserProvider";
import './Subscription.css'

export const SubscribeButton = ({ singleProfile }) => {
    const { changeSubscription } = useContext(UserContext)
    const toggleSubscription = () => {
        changeSubscription({
            creator_id: singleProfile.priority_user.id,
            subscribed: !singleProfile.priority_user.subscribed
        })
    }
    return (
        <Button className="subscribeButton" onClick={toggleSubscription}>{singleProfile.priority_user?.subscribed ? "- Unsubscribe" : "+ Subscribe"}</Button>
    )
}