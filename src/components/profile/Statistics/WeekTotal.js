import React from "react"
import { useParams } from "react-router-dom";
import './Statistics.css'

//just a container for a footer for completeness
export const WeekTotal = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    return (
        <div className="statBox">
            <div>Week Total</div>
            <div>{profileId ? (userStatistics.week_total/60).toFixed(2) : (myStatistics.week_total/60).toFixed(2)}</div>
            <div>Hours</div>
        </div>
    )
}