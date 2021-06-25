import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Register.css"
import Logo from '../images/PriorityLogo.png'

//This is a form to register a new user to the database
export const Register = () => {
    //useHistory keeps track of the URL visted in a URL stack
    const history = useHistory()
    //initializes a state variable to keep track of which page of the form you are on, so react knows which one to render
    const [currentPage, setCurrentPage] = useState(1)
    //the main state variable that will be saved to the database
    const [registerUser, setRegisterUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        priority: "",
        why: "",
        what: "",
        how: 5
    })
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
        return fetch("http://localhost:8000/register", {
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
                    localStorage.setItem("priority_user_token", res.token)
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
    const advancePage = (event) => {
        event.preventDefault()
        setCurrentPage(currentPage + 1)
    }
    //takes the user back to the dashboard screen if they do not want to register a new member
    const backPage = (event) => {
        event.preventDefault()
        setCurrentPage(currentPage - 1)
    }
    //a form split up into two pages with a ternary. Could not do two different return statements with a conditional because it would kick me out of an input box when typing.
    return (
        <main className="registerPage">
            <img className="croppedLogo logoSpacing" src={Logo} alt="priority logo" />
            {currentPage === 1 && (
                <Form className="registerFormPage1">
                    <h2 className="h3 mb-3 font-weight-normal">Sign Up</h2>
                    <FormGroup className="registerFormPage1">
                        <Label for="first_name">First Name</Label>
                        <Input onChange={handleInputChange} type="text" name="first_name" placeholder="first name" value={registerUser.first_name} id="first_name" autoComplete="given-name" required />
                    </FormGroup>
                    <FormGroup className="registerFormPage1">
                        <Label for="last_name">Last Name</Label>
                        <Input onChange={handleInputChange} type="text" name="last_name" placeholder="last name" value={registerUser.last_name} id="last_name" autoComplete="family-name" required />
                    </FormGroup>
                    <FormGroup className="registerFormPage1">
                        <Label for="inputEmail">Email address</Label>
                        <Input onChange={handleInputChange} type="email" name="email" placeholder="email" value={registerUser.email} id="email" autoComplete="email" required />
                    </FormGroup>
                    <FormGroup className="registerFormPage1">
                        <Label for="inputPassword">Create Password</Label>
                        <Input onChange={handleInputChange} type="password" name="password" placeholder="password" value={registerUser.password} id="password" autoComplete="new-password" required />
                    </FormGroup>
                    <FormGroup>
                        <Button className="registerNavButton" onClick={handleCancelRegister}>Cancel</Button>
                        <Button className="registerNavButton" disabled={registerUser.first_name === "" || registerUser.last_name === "" || registerUser.email === "" || registerUser.password === ""} onClick={advancePage}>Next</Button>
                    </FormGroup>
                </Form>
            )}
            {currentPage === 2 && (
                <>
                    <h3>What is the most important thing to you?</h3>
                    <Form>
                        <FormGroup className="registerFormPage1">
                            <Input onChange={handleInputChange} value={registerUser.priority} id="priority" type="text" name="priority" placeholder="Ex: My children" required />
                        </FormGroup>
                    </Form>
                    <FormGroup>
                        <Button className="registerNavButton" onClick={handleCancelRegister}>Cancel</Button>
                        <Button className="registerNavButton" onClick={backPage}>Go Back</Button>
                        <Button className="registerNavButton" disabled={registerUser.priority === ""} onClick={advancePage}>Next</Button>
                    </FormGroup>
                </>
            )}
            {currentPage === 3 && (
                <>
                    <div className="whyWhatHowHeader logoSpacing">
                        <h3><strong>Why</strong></h3>
                        <h3 className="whyWhatHowMargin">What</h3>
                        <h3>How</h3>
                    </div>
                    <h3>Why is this your priority?</h3>
                    <Form>
                        <FormGroup className="registerFormPage1">
                            <Input onChange={handleInputChange} value={registerUser.why} id="why" type="text" name="why" placeholder="Ex: I want my children to be good examples for the next generation" required />
                        </FormGroup>
                    </Form>
                    <FormGroup>
                        <Button className="registerNavButton" onClick={handleCancelRegister}>Cancel</Button>
                        <Button className="registerNavButton" onClick={backPage}>Go Back</Button>
                        <Button className="registerNavButton" disabled={registerUser.why === ""} onClick={advancePage}>Next</Button>
                    </FormGroup>
                </>
            )}
            {currentPage === 4 && (
                <>
                    <div className="whyWhatHowHeader logoSpacing">
                        <h3>Why</h3>
                        <h3 className="whyWhatHowMargin"><strong>What</strong></h3>
                        <h3>How</h3>
                    </div>
                    <h3>What can you do to prioritize your priority?</h3>
                    <Form>
                        <FormGroup className="registerFormPage1">
                            <Input onChange={handleInputChange} value={registerUser.what} id="what" type="text" name="what" placeholder="Ex: read to them everyday" required />
                        </FormGroup>
                    </Form>
                    <FormGroup>
                        <Button className="registerNavButton" onClick={handleCancelRegister}>Cancel</Button>
                        <Button className="registerNavButton" onClick={backPage}>Go Back</Button>
                        <Button className="registerNavButton" disabled={registerUser.what === ""} onClick={advancePage}>Next</Button>
                    </FormGroup>
                </>
            )}
            {currentPage === 5 && (
                <>
                    <div className="whyWhatHowHeader logoSpacing">
                        <h3>Why</h3>
                        <h3 className="whyWhatHowMargin">What</h3>
                        <h3><strong>How</strong></h3>
                    </div>
                    <h3 className="theGoalSpeech">Whether you realize it or not, you have just set a goal.</h3>
                    <h3 className="theGoalSpeech">Goals are best met if you make a daily effort to achieve them. Large goals can be satisfying if they are tracked with small milestones.</h3>
                    <h3 className="theGoalSpeech">How much time can you commit every day to prioritizing your priority?</h3>
                    <h3 className="thePromise">I vow to spend
                        <input className="timeInput" onChange={handleInputChange} value={registerUser.how} id="how" type="number" name="how" max="480" min="5" step="5" required />
                        minutes a day on my priority</h3>
                    <FormGroup>
                        <Button className="registerNavButton" onClick={handleCancelRegister}>Cancel</Button>
                        <Button className="registerNavButton" onClick={backPage}>Go Back</Button>
                        <Button className="registerNavButton" onClick={handleRegister}>Register</Button>
                    </FormGroup>
                </>
            )}
        </main>
    )
}

