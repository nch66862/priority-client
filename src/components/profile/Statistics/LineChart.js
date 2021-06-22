import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2'
import { ProfileContext } from "../ProfileProvider";
import { UserContext } from "../../users/UserProvider";

//just a container for a footer for completeness
export const LineChart = () => {
    const { profileId } = useParams()
    const { getMyStatistics, myStatistics } = useContext(ProfileContext)
    const { getUserStatistics, userStatistics } = useContext(UserContext)
    useEffect(() => {
        if (profileId) {
            getUserStatistics(profileId)
        } else {
            getMyStatistics()
        }
        // eslint-disable-next-line
    }, [])
    return (
        <Line 
            data={profileId ? userStatistics : myStatistics} 
            height={400}
            width={600}
        />
    )
}