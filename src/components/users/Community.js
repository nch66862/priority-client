import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { ListGroup, ListGroupItem, Label, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { UserContext } from "./UserProvider";

export const Community = () => {
    const { getPublicProfiles, profiles } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        getPublicProfiles()
        // eslint-disable-next-line
    }, [])
    const handleOpenProfile = (event) => {
        debugger
        history.push(`/profiles/${event.target.id}`
    )}
    return (
        <div>
            <h1>Community</h1>
            <ListGroup>
                {profiles.map(singleProfile => {
                    return (
                        <div key={singleProfile.id} id={singleProfile.id} onClick={handleOpenProfile}>
                            <ListGroupItem>
                                <Label id={singleProfile.id}>{singleProfile.priority_user.user.first_name}</Label>
                                <ListGroupItemHeading id={singleProfile.id}>{singleProfile.priority}</ListGroupItemHeading>
                                <ListGroupItemText id={singleProfile.id}>{singleProfile.why}</ListGroupItemText>
                            </ListGroupItem>
                        </div>
                    )
                })}
            </ListGroup>
        </div>
    )
}