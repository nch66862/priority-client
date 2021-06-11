import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
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
    //a form split up into two pages with a ternary. Could not do two different return statements with a conditional because it would kick me out of an input box when typing.
    return (
        currentPage === "first" ? <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" open={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => setConflictDialog(false)}>Close</button>
            </dialog>
            <h1>Lost River Call Center</h1>
            <form className="form--login" >
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleInputChange} type="text" name="firstName" className="form-control" placeholder="first name" value={registerUser.firstName} id="firstName" autoComplete="given-name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleInputChange} type="text" name="lastName" className="form-control" placeholder="last name" value={registerUser.lastName} id="lastName" autoComplete="family-name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input onChange={handleInputChange} type="email" name="email" className="form-control" placeholder="email address" value={registerUser.email} id="email" autoComplete="email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Create Password </label>
                    <input onChange={handleInputChange} type="password" name="email" className="form-control" placeholder="create password" value={registerUser.password} id="password" autoComplete="new-password" required />
                </fieldset>
                <fieldset>
                    <button className="btn" > Next </button>
                    <button className="cancelButton" type="cancel" onClick={handleCancelRegister}> Cancel </button>
                </fieldset>
            </form>
        </main> : <main style={{ textAlign: "center" }}>
            <h1>Lost River Call Center</h1>
            <h3>A Little More Information Is Needed</h3>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <fieldset>
                    <label htmlFor="inputEmail"> Phone Number </label>
                    <input onChange={handleInputChange} value={registerUser.phone} id="phone" type="phone" name="phone" className="form-control" placeholder="9805554466" autoComplete="tel" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Address </label>
                    <input onChange={handleInputChange} value={registerUser.address} id="address" type="address" name="address" className="form-control" placeholder="address" autoComplete="street-address" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> City </label>
                    <input onChange={handleInputChange} value={registerUser.city} id="city" type="text" name="city" className="form-control" placeholder="city" />
                </fieldset>
                <fieldset>
                    <button className="btn" type="submit"> Register </button>
                    <button className="cancelButton" type="cancel" onClick={handleCancelRegister}> Cancel </button>
                </fieldset>
            </form>
        </main>
    )
}

