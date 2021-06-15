import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import DatePicker from 'react-date-picker';

//just a container for a footer for completeness
export const HistoryForm = ({ userProfile, toggle, modal }) => {
    const { getWhat, submitHistory } = useContext(ProfileContext)
    const [what, setWhat] = useState([])
    const [historyEvent, setHistoryEvent] = useState({
        what_id: "",
        time_spent: userProfile.priority?.how,
        goal_date: new Date()
    })
    // dates
    // account creation day
    const original_date = new Date(userProfile.priority.creation_date)
    // current day
    const today = new Date()
    // see if history on those days and days in between
    // ask user 1 by 1 starting with current day and working backwards
    useEffect(() => {
        getWhat()
            .then(response => setWhat(response))
    }, [])
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
    const handleChangeDate = (date) => {
        debugger
        let newHistoryEvent = { ...historyEvent }
        newHistoryEvent.goal_date = date
        setHistoryEvent(newHistoryEvent)
    }
    const handleSubmitHistory = () => {
        submitHistory(historyEvent)
            .then(() => toggle())
    }
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
                <ModalHeader>I spent my time...</ModalHeader>
                <RadioGroup onChange={handleChangeWhat}>
                    {what.map(singleWhat => {
                        return <RadioButton rootColor="black" pointColor="Green" value={`${singleWhat.id}`} key={singleWhat.id}>{singleWhat.what}</RadioButton>
                    })}
                </RadioGroup>
                <div>
                    for <input onChange={handleChangeTime} type="number" max={480} min={5} step={5} value={historyEvent.time} required /> minutes today.
                </div>
                <Label>Select A Day</Label>
                <DatePicker
                    onChange={handleChangeDate}
                    value={historyEvent.goal_date}
                />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmitHistory}>Submit</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}