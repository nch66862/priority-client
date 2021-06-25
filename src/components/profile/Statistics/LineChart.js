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
            // data={profileId ? userStatistics.line_chart?.data : myStatistics.line_chart?.data} 
            data={{
                labels: (profileId ? userStatistics.line_chart?.labels : myStatistics.line_chart?.labels),
                datasets: [
                    {
                        label: 'time',
                        data: (profileId ? userStatistics.line_chart?.data : myStatistics.line_chart?.data),
                        color: ['black'],
                        borderColor: ['black'],
                        borderWidth: 1
                    }
                ]
            }}
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