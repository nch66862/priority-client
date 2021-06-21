import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { ListGroup, ListGroupItem, Label, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { UserContext } from "./UserProvider";
import './Community.css'
import { SubscribeButton } from "./subscriptions/SubscribeButton";

export const Community = () => {
    const { getPublicProfiles, profiles } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        getPublicProfiles()
        // eslint-disable-next-line
    }, [])
    const handleOpenProfile = (event) => {
        history.push(`/profiles/${event.target.id}`
        )
    }
    return (
        <div>
            <h1>Community</h1>
            <ListGroup>
                {profiles.map(singleProfile => {
                    return (
                        <div className="communityProfileListItem" key={singleProfile.id} id={singleProfile.id}>
                            <ListGroupItem>
                                <div className="flexSubscribeButton">
                                    <div>
                                        <Label onClick={handleOpenProfile} className="communityProfileListItem" id={singleProfile.id}>{singleProfile.priority_user.user.first_name}</Label>
                                        <ListGroupItemHeading onClick={handleOpenProfile} className="communityProfileListItem" id={singleProfile.id}>{singleProfile.priority}</ListGroupItemHeading>
                                        <ListGroupItemText onClick={handleOpenProfile} className="communityProfileListItem" id={singleProfile.id}>{singleProfile.why}</ListGroupItemText>
                                    </div>
                                    <SubscribeButton singleProfile={singleProfile}/>
                                </div>
                            </ListGroupItem>
                        </div>
                    )
                })}
            </ListGroup>
        </div>
    )
}