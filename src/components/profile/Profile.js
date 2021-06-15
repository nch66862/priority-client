import React, { useContext, useEffect, useState } from "react"
import { ProfileContext } from "./ProfileProvider"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

//just a container for a footer for completeness
export const Profile = () => {
    const { getProfile, getWhat } = useContext(ProfileContext)
    const [userProfile, setUserProfile] = useState({})
    const [what, setWhat] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        getProfile()
            .then(response => setUserProfile(response))
            .then(() => getWhat())
            .then(response => setWhat(response))
    }, [])
    const selectWhat = () => {
        console.log("go go go")
    }
    return (
        <>
            <h1>Today</h1>
            <h4>{new Date().toLocaleDateString("en-US",
                {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: "UTC"
                })}
            </h4>
            <h2>{userProfile.priority?.priority} is my priority</h2>
            <div>because {userProfile.priority?.why}.</div>
            <Button onClick={toggle}>Input Time</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                    <RadioGroup>
                        {what.map(singleWhat => {
                            return <RadioButton value={singleWhat.id} key={singleWhat.id}>{singleWhat.what}</RadioButton>
                        })}
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}