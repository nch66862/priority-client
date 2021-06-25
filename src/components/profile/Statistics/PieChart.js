import React from "react"
import { useParams } from "react-router-dom";
import { Pie, defaults } from 'react-chartjs-2'
import './Statistics.css'

//just a container for a footer for completeness
export const PieChart = ({ myStatistics, userStatistics }) => {
    const { profileId } = useParams()
    const dataLength = profileId ? userStatistics.pie_chart.labels.length : myStatistics.pie_chart.labels.length
    const backgroundColors = []
    for (let i = 0; i < dataLength; i++) {
        backgroundColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }
    defaults.plugins.legend.display = false
    defaults.font.size = 16
    return (
        <section className="pieChart">
            <Pie
                data={{
                    labels: (profileId ? userStatistics.pie_chart.labels : myStatistics.pie_chart.labels),
                    datasets: [
                        {
                            label: 'time',
                            data: (profileId ? userStatistics.pie_chart.data : myStatistics.pie_chart.data),
                            backgroundColor: backgroundColors,
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
                            text: 'Your Minutes Spent'
                        }
                    }
                }}
            />
        </section>
    )
}