import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Button, ListGroup, ListGroupItem, Input } from 'reactstrap';
import { UserContext } from "./UserProvider";

export const Community = () => {
    const { getPublicProfiles, users } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        getPublicProfiles()
        // eslint-disable-next-line
    }, [])
    const handleOpenProfile = (event) => history.push(`/profiles/${event.target.id}`)
    return (
        <div>
            <h1>Community</h1>
            <ListGroup>
                {users.map(singleUser => {
                    return (
                        <div key={singleUser.id} id={singleUser.id} onClick={handleOpenProfile}>
                            {/* <ListGroupItem>{singleUser}</ListGroupItem> */}
                        </div>
                    )
                })}
            </ListGroup>
        </div>
    )
}