import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import "./NavBar.css"
import { Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { ProfileContext } from "../profile/ProfileProvider";

export const NavBar = () => {
    const { changePrivacy } = useContext(ProfileContext)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("priority_user_token")
        localStorage.removeItem("priority_user_admin")
        localStorage.removeItem("logged_in_user")
        history.push("/login")
    }
    const handleChangePrivacy = (event) => {
        debugger
        changePrivacy(event.target.value)
    }
    return (
        <>
            <Navbar>
                <NavbarBrand href="/">Priority</NavbarBrand>
                <NavItem>
                    <NavLink href="/community">Community</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/leaderboard">Leaderboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/subscriptions">Subscriptions</NavLink>
                </NavItem>
                {(localStorage.getItem("priority_user_token") !== null) && (
                    <>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Profile
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={toggle}>
                                    Change Visibility
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={handleLogout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </>
                )}
                <NavbarText>Welcome</NavbarText>
            </Navbar>
            <Modal isOpen={modal} toggle={toggle}>
                    <ModalBody>
                        <ModalHeader>My Profile</ModalHeader>
                        <RadioGroup horizontal onChange={handleChangePrivacy}>
                            <RadioButton rootColor="black" pointColor="Green" value="Public" key={1}>Public</RadioButton>
                            <RadioButton rootColor="black" pointColor="Green" value="Private" key={2}>Private</RadioButton>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>OK</Button>
                    </ModalFooter>
            </Modal>
        </>
    )
}
