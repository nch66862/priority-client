import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./NavBar.css"
import { Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { ProfileContext } from "../profile/ProfileProvider";

export const NavBar = () => {
    const { changePrivacy, getProfile } = useContext(ProfileContext)
    const [visibilityModal, setVisibilityModal] = useState(false);
    const [priorityModal, setPriorityModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [privacy, setPrivacy] = useState({
        is_public: false
    });
    const toggleVisibilityModal = () => setVisibilityModal(!visibilityModal);
    const togglePriorityModal = () => setPriorityModal(!priorityModal);
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("priority_user_token")
        localStorage.removeItem("priority_user_admin")
        localStorage.removeItem("logged_in_user")
        history.push("/login")
    }
    const handleChangePrivacy = (value) => {
        changePrivacy({
            is_public: value
        })
            .then(res => setPrivacy(res))
    }
    useEffect(() => {
        getProfile()
            .then(res => {
                setPrivacy(res.priority)
                setCurrentUser(res)
            })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Navbar>
                <NavbarBrand href="/">Priority</NavbarBrand>
                <NavItem className="navItem">
                    <NavLink onClick={() => history.push("/community")}>Community</NavLink>
                </NavItem>
                <NavItem className="navItem">
                    <NavLink onClick={() => history.push("/leaderboard")}>Leaderboard</NavLink>
                </NavItem>
                <NavItem className="navItem">
                    <NavLink onClick={() => history.push("/subscriptions")}>Subscriptions</NavLink>
                </NavItem>
                {(localStorage.getItem("priority_user_token") !== null) && (
                    <>
                        <UncontrolledDropdown nav inNavbar className="navItem">
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={toggleVisibilityModal}>
                                    Change your visibility
                                </DropdownItem>
                                <DropdownItem onClick={togglePriorityModal}>
                                    Change your priority
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={handleLogout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </>
                )}
                <NavbarText>Welcome, {currentUser.user?.user.first_name}</NavbarText>
            </Navbar>
            <Modal isOpen={visibilityModal} toggle={toggleVisibilityModal}>
                <ModalBody>
                    <ModalHeader>My Profile: {privacy.is_public ? "Public" : "Private"}</ModalHeader>
                    <RadioGroup horizontal onChange={handleChangePrivacy}>
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
