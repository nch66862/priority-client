import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";

//just a container for a footer for completeness
export const Statistics = () => {
    const { profileId } = useParams()
    const [modal, setModal] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line
    }, [])
    return (
        <div>
        Hi im statistics
        </div>
    )
}