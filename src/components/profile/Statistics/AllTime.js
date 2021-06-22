import React from "react"
import { useParams } from "react-router-dom";
import './Statistics.css'

//just a container for a footer for completeness
export const AllTime = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    return (
        <div className="statBox">
            <div>All Time</div>
            <div>{profileId ? (userStatistics.total_time/60/24).toFixed(2) : (myStatistics.total_time/60/24).toFixed(2)}</div>
            <div>Days</div>
        </div>
    )
}