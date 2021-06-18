import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from '../ProfileProvider'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form, FormGroup } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import DatePicker from 'react-date-picker';
import { isYesterday, format } from 'date-fns'

export const HistoryForm = ({ profile, toggle, modal }) => {
    const { getWhat, submitHistory, whats } = useContext(ProfileContext)
    const [historyEvent, setHistoryEvent] = useState({
        what_id: "",
        time_spent: profile.priority?.how,
        goal_date: new Date()
    })
    const [visibleDate, setVisibleDate] = useState("today")
    useEffect(() => {
        getWhat()
        // eslint-disable-next-line
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
        <Modal isOpen={modal} toggle={toggle}>
            <Form>
                <ModalBody>
                    <ModalHeader>I spent my time...</ModalHeader>
                    <RadioGroup onChange={handleChangeWhat}>
                        {whats.map(singleWhat => {
                            return <RadioButton rootColor="black" pointColor="Green" value={`${singleWhat.id}`} key={singleWhat.id}>{singleWhat.what}</RadioButton>
                        })}
                    </RadioGroup>
                    <div>
                        for <input onChange={handleChangeTime} type="number" max={480} min={5} step={5} value={historyEvent.time_spent} required /> minutes {visibleDate}.
                    </div>
                    <FormGroup>
                        <Label>Change the Date</Label><br></br>
                        <DatePicker onChange={handleChangeDate} value={historyEvent.goal_date} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitHistory}>Submit</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}