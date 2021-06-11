import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

//This is a form to register a new user to the database
export const Register = () => {
    //useHistory keeps track of the URL visted in a URL stack
    const history = useHistory()
    //initializes a state variable to keep track of which page of the form you are on, so react knows which one to render
    const [currentPage, setCurrentPage] = useState(1)
    //the main state variable that will be saved to the database
    const [registerUser, setRegisterUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        groupId: 0,
        roleId: 0,
        phone: "",
        address: "",
        city: "",
        state: "",
        photo: "",
        callTime: "",
        canCall: true,
        familyId: 0,
        primaryMember: false
    })
    //state variable controls displaying the dialog box if the person registering has an email account that already exists in the database
    const [conflictDialog, setConflictDialog] = useState(false)
    //modifies the state variable when changes are made to the inputs on the form
    const handleInputChange = (event) => {
        const newUser = { ...registerUser }
        if (event.target.id.includes("Id")) {
            newUser[event.target.id] = parseInt(event.target.value)
        } else {
            newUser[event.target.id] = event.target.value
        }
        setRegisterUser(newUser)
    }
    //performs a post to the database when registering a new memeber
    const handleRegister = (event) => {
        event.preventDefault()
        return fetch("https://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(registerUser)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("rare_user_id", res.token)
                    history.push("/")
                }
            })
    }
    //takes the user back to the dashboard screen if they do not want to register a new member
    const handleCancelRegister = (event) => {
        event.preventDefault()
        history.push("/Login")
    }
    //takes the user back to the dashboard screen if they do not want to register a new member
    const advancePage2 = (event) => {
        event.preventDefault()
        setCurrentPage(2)
    }
    //a form split up into two pages with a ternary. Could not do two different return statements with a conditional because it would kick me out of an input box when typing.
    return (
        <>
            {currentPage === 1 && <main style={{ textAlign: "center" }}>
                <h1>Priority</h1>
                <Form>
                    <h2 className="h3 mb-3 font-weight-normal">Sign Up</h2>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={registerUser.firstName} id="firstName" autoComplete="given-name" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={registerUser.lastName} id="lastName" autoComplete="family-name" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputEmail">Email address</Label>
                        <Input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email" value={registerUser.email} id="email" autoComplete="email" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword">Create Password</Label>
                        <Input onChange={handleInputChange} type="password" name="password" className="form-control" placeholder="password" value={registerUser.password} id="password" autoComplete="new-password" required />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={advancePage2}>Next</Button>
                        <Button onClick={handleCancelRegister}> Cancel </Button>
                    </FormGroup>
                </Form>
            </main>}
            {currentPage === 2 && <main style={{ textAlign: "center" }}>
                <h1>Lost River Call Center</h1>
                <h3>A Little More Information Is Needed</h3>
                <Form className="form--login">
                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                    <FormGroup>
                        <Label for="inputEmail"> Phone Number </Label>
                        <Input onChange={handleInputChange} value={registerUser.phone} id="phone" type="phone" name="phone" className="form-control" placeholder="9805554466" autoComplete="tel" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputEmail"> Address </Label>
                        <Input onChange={handleInputChange} value={registerUser.address} id="address" type="address" name="address" className="form-control" placeholder="address" autoComplete="street-address" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputEmail"> City </Label>
                        <Input onChange={handleInputChange} value={registerUser.city} id="city" type="text" name="city" className="form-control" placeholder="city" />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={handleRegister}>Register</Button>
                        <Button onClick={handleCancelRegister}> Cancel </Button>
                    </FormGroup>
                </Form>
            </main>}
        </>
    )
}

