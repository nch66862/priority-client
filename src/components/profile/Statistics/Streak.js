import React from "react"
import { useParams } from "react-router-dom";
import './Statistics.css'

//just a container for a footer for completeness
export const Streak = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    return (
        <div className="statBox">
            <div>Current Streak</div>
            <div>{profileId ? userStatistics.current_streak : myStatistics.current_streak}</div>
            <div>Days</div>
        </div>
    )
}