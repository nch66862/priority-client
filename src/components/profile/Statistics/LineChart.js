import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Line, defaults, Chart } from 'react-chartjs-2'
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
    defaults.plugins.legend.display = false
    defaults.font.size = 16
    return (
        <Line
            data={myStatistics.line_chart?.data}
            // data={profileId ? userStatistics.line_chart : myStatistics.line_chart} 
            height={400}
            width={600}
            options={{
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0
                    }
                },
                elements: {
                    line: {
                        tension: 0.3
                    }
                }
            }}
        />
    )
}