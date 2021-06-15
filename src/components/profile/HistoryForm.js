import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

//just a container for a footer for completeness
export const HistoryForm = ({ userProfile, toggle, modal }) => {
    const { getWhat, submitHistory } = useContext(ProfileContext)
    const [what, setWhat] = useState([])
    const [historyEvent, setHistoryEvent] = useState({
        what: "",
        time: userProfile.priority?.how
    })
    useEffect(() => {
        getWhat()
            .then(response => setWhat(response))
    }, [])
    const handleChangeWhat = (whatId) => {
        let newHistoryEvent = {...historyEvent}
        newHistoryEvent.what = whatId
        setHistoryEvent(newHistoryEvent)
    }
    const handleChangeTime = (event) => {
        let newHistoryEvent = {...historyEvent}
        newHistoryEvent.time = event.target.value
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
                    for <input onChange={handleChangeTime} name="time" type="number" max={480} min={5} step={5} value={historyEvent.time} required /> minutes today.
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmitHistory}>Submit</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}