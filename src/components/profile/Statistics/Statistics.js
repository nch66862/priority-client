import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ProfileContext } from "../ProfileProvider";
import { LineChart } from "./LineChart";

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
            <LineChart />
        </div>
    )
}