import React, { useContext, useEffect, useState } from "react"
import './Profile.css'
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2'

//just a container for a footer for completeness
export const LineChart = () => {
    const { profileId } = useParams()
    const [modal, setModal] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line
    }, [])
    return (
        <Line 
            data={} 
            height={400}
            width={600}
        />
    )
}