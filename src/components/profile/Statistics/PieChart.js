import React from "react"
import { useParams } from "react-router-dom";
import { Pie, defaults } from 'react-chartjs-2'

//just a container for a footer for completeness
export const PieChart = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    defaults.plugins.legend.display = false
    defaults.font.size = 16
    return (
        <Pie
            data={{
                labels: (profileId ? userStatistics.pie_chart?.labels : myStatistics.pie_chart?.labels),
                datasets: [
                    {
                        label: 'time',
                        data: (profileId ? userStatistics.pie_chart?.data : myStatistics.pie_chart?.data),
                        backgroundColor: ['red', 'blue'],
                        borderColor: ['black'],
                        borderWidth: 1
                    }
                ]
            }}
            height={400}
            width={500}
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Your Time'
                    }
                }
            }}
        />
    )
}