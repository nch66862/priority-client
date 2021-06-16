import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, Form, ListGroup, ListGroupItem } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import DatePicker from 'react-date-picker';
import { isYesterday, format } from 'date-fns'

export const What = ({ userProfile, toggle, modal }) => {
    const { getWhat, submitHistory } = useContext(ProfileContext)
    const [what, setWhat] = useState([])
    const [historyEvent, setHistoryEvent] = useState({
        what_id: "",
        goal_date: new Date()
    })
    const [visibleDate, setVisibleDate] = useState("today")
    useEffect(() => {
        getWhat()
            .then(response => setWhat(response))
    }, [])
    const formatVisibleDate = (date) => {
        const is_yesterday = isYesterday(date)
        if (is_yesterday) {
            setVisibleDate("yesterday")
        } else {
            setVisibleDate(date.toLocaleDateString("en-US",
                {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: "UTC"
                }))
        }
    }
    const handleChangeWhat = (whatId) => {
        let newHistoryEvent = { ...historyEvent }
        newHistoryEvent.what_id = whatId
        setHistoryEvent(newHistoryEvent)
    }
    const handleChangeTime = (event) => {
        let newHistoryEvent = { ...historyEvent }
        newHistoryEvent.time_spent = event.target.value
        setHistoryEvent(newHistoryEvent)
    }
    const handleChangeDate = (datetime) => {
        let newHistoryEvent = { ...historyEvent }
        newHistoryEvent.goal_date = datetime
        setHistoryEvent(newHistoryEvent)
        formatVisibleDate(datetime)
    }
    const handleSubmitHistory = () => {
        historyEvent.goal_date = format(historyEvent.goal_date, "yyyy-MM-dd")
        debugger
        submitHistory(historyEvent)
            .then(() => toggle())
    }
    return (
        <>
            <ListGroup onChange={handleChangeWhat}>
                {what.map(singleWhat => {
                    return <ListGroupItem key={singleWhat.id}>{singleWhat.what}</ListGroupItem>
                })}
            </ListGroup>
            <Form>
                <Button color="primary" onClick={handleSubmitHistory}>Submit</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </Form>
        </>
    )
}