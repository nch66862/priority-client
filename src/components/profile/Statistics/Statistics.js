import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { ProfileContext } from "../ProfileProvider";

//just a container for a footer for completeness
export const Statistics = () => {
    const { profileId } = useParams()
    const [modal, setModal] = useState(false);
    const { getMyStatistics } = useContext(ProfileContext)
    useEffect(() => {
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            Hi im statistics
            <Button onClick={() => getMyStatistics()}>Hit the History Endpoint</Button>
        </div>
    )
}