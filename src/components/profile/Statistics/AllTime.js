import React from "react"
import { useParams } from "react-router-dom";

//just a container for a footer for completeness
export const AllTime = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    return (
        <div>
            <div>All Time</div>
            <div>{profileId ? userStatistics.total_time/60/24 : myStatistics.week_total/60/24}</div>
            <div>Days</div>
        </div>
    )
}