import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import InputNumber from 'rc-input-number';

//just a container for a footer for completeness
export const HistoryForm = ({ userProfile, toggle }) => {
    const { getWhat } = useContext(ProfileContext)
    const [what, setWhat] = useState([])
    useEffect(() => {
        getWhat()
            .then(response => setWhat(response))
    }, [])
    const selectWhat = () => {
        console.log("go go go")
    }
    const handleSubmitHistory = () => {
        console.log("no no no no no no no no no")
    }
    return (
        <>
                <ModalBody>
                    <ModalHeader>I spent my time...</ModalHeader>
                    <RadioGroup>
                        {what.map(singleWhat => {
                            return <RadioButton rootColor="black" pointColor="Green" value={singleWhat.id} key={singleWhat.id}>{singleWhat.what}</RadioButton>
                        })}
                    </RadioGroup>
                    <div>
                        for <InputNumber max={480} min={5} step={5} defaultValue={userProfile.priority?.how} required /> minutes today.
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitHistory}>Submit</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
        </>
    )
}