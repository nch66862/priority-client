import React, { useContext, useEffect, useState } from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { ProfileContext } from "../../profile/ProfileProvider";

export const VisibilityModal = ({ visibilityModal, toggleVisibilityModal }) => {
    const { changePrivacy, getProfile, profile } = useContext(ProfileContext)
    const [privacy, setPrivacy] = useState({
        is_public: false
    });
    const handleChangePrivacy = (value) => {
        changePrivacy({
            is_public: value
        })
            .then(res => setPrivacy(res))
    }
    useEffect(() => {
        getProfile()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setPrivacy(profile.priority)
        // eslint-disable-next-line
    }, [profile])
    return (
        <>
            <Modal isOpen={visibilityModal} toggle={toggleVisibilityModal}>
                <ModalBody>
                    <ModalHeader>My Profile: {privacy?.is_public ? "Public" : "Private"}</ModalHeader>
                    <RadioGroup horizontal onChange={handleChangePrivacy} value={`${privacy?.is_public}`}>
                        <RadioButton rootColor="black" pointColor="Green" value="true">Public</RadioButton>
                        <RadioButton rootColor="black" pointColor="Green" value="false">Private</RadioButton>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleVisibilityModal}>OK</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
