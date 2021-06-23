import React from "react"
import { useParams } from "react-router-dom";
import { Line, defaults } from 'react-chartjs-2'

//just a container for a footer for completeness
export const LineChart = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    defaults.plugins.legend.display = false
    defaults.font.size = 16
    return (
        <Line
            data={profileId ? userStatistics.line_chart?.data : myStatistics.line_chart?.data} 
            height={400}
            width={500}
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