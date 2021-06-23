import React, { useContext, useEffect } from "react"
import { AllTime } from "./AllTime";
import { LineChart } from "./LineChart";
import { WeekTotal } from "./WeekTotal";
import { Streak } from "./Streak";
import { useParams } from "react-router";
import { ProfileContext } from "../ProfileProvider";
import { UserContext } from "../../users/UserProvider";
import './Statistics.css'

//just a container for a footer for completeness
export const Statistics = () => {
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
        <div>
            <LineChart myStatistics={myStatistics} userStatistics={userStatistics} />
            <div className="statFlexBox">
                <Streak myStatistics={myStatistics} userStatistics={userStatistics} />
                <div className="centerStatBox"></div>
                <WeekTotal myStatistics={myStatistics} userStatistics={userStatistics} />
                <div className="centerStatBox"></div>
                <AllTime myStatistics={myStatistics} userStatistics={userStatistics} />
            </div>
        </div>
    )
}