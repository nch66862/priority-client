import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./NavBar.css"
import { UserContext } from "../users/UserProvider"
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from "reactstrap"

export const NavBar = () => {
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("priority_user_token")
        localStorage.removeItem("priority_user_admin")
        localStorage.removeItem("logged_in_user")
        history.push("/login")
    }
    return (
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
                            <DropdownItem>
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
    )
}
