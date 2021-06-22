import React from "react"
import { useParams } from "react-router-dom";

//just a container for a footer for completeness
export const WeekTotal = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    return (
        <div>
            <div>Week Total</div>
            <div>{profileId ? userStatistics.week_total/60 : myStatistics.week_total/60}</div>
            <div>Hours</div>
        </div>
    )
}