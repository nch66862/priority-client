import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./NavBar.css"
import { Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap"
import { ProfileContext } from "../profile/ProfileProvider";
import { VisibilityModal } from "./privacy/VisibilityModal";
import { PriorityModal } from "./profile/PriorityModal";

export const NavBar = () => {
    const { getProfile, profile } = useContext(ProfileContext)
    const [visibilityModal, setVisibilityModal] = useState(false);
    const [priorityModal, setPriorityModal] = useState(false);
    const toggleVisibilityModal = () => setVisibilityModal(!visibilityModal);
    const togglePriorityModal = () => setPriorityModal(!priorityModal);
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("priority_user_token")
        localStorage.removeItem("priority_user_admin")
        localStorage.removeItem("logged_in_user")
        history.push("/login")
    }
    useEffect(() => {
        getProfile()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Navbar>
                <NavbarBrand href="/">Priority</NavbarBrand>
                <NavItem className="navItem">
                    <NavLink onClick={() => history.push("/community")}>Community</NavLink>
                </NavItem>
                {/* <NavItem className="navItem">
                    <NavLink onClick={() => history.push("/leaderboard")}>Leaderboard</NavLink>
                </NavItem> */}
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
                <NavbarText>Welcome, {profile.user?.user.first_name}</NavbarText>
            </Navbar>
            <VisibilityModal visibilityModal={visibilityModal}  toggleVisibilityModal={toggleVisibilityModal} />
            <PriorityModal priorityModal={priorityModal}  togglePriorityModal={togglePriorityModal} />
        </>
    )
}
