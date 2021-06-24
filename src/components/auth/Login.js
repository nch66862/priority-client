import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom";
import './Login.css'
import Logo from '../images/PriorityLogo.png'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//This is a form to log an existing user in
export const Login = () => {
    const history = useHistory()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    //functions used for demo website
    const logInAsNickCarver = (event) => {
        event.preventDefault()
        localStorage.setItem("logged_in_user", "Nick")
        history.push("/loading")
    }
    const logInAsLoganLanning = (event) => {
        event.preventDefault()
        localStorage.setItem("logged_in_user", "Logan")
        history.push("/loading")
    }
    const handleLogin = (event) => {
        event.preventDefault()
        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("priority_user_token", res.token)
                    history.push("/")
                }
            })
    }
    const handleInputChange = (event) => {
        let modifiedUser = {...user}
        modifiedUser[event.target.name] = event.target.value
        setUser(modifiedUser)
    }
    return (
        <main className="container--login centered">
            <img className="loginLogo" src={Logo} alt="priority logo" />
            <section>
                <Button color="primary" onClick={logInAsNickCarver} className="loginButton btn signInButton" type="submit">Sign in as Nick Carver</Button>
            </section>
            <section>
                <Button color="primary" onClick={logInAsLoganLanning} className="loginButton btn signInButton" type="submit">Sign in as Logan Lanning</Button>
            </section>
            <section>
                or
            </section>
            <section>
                <Form>
                    <FormGroup className="registerFormPage1">
                        <Label for="inputEmail">Email address</Label>
                        <Input onChange={handleInputChange} type="email" name="email" placeholder="email" value={user.email} id="email" autoComplete="email" required />
                    </FormGroup>
                    <FormGroup className="registerFormPage1">
                        <Label for="inputPassword">Create Password</Label>
                        <Input onChange={handleInputChange} type="password" name="password" placeholder="password" value={user.password} id="password" autoComplete="new-password" required />
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={handleLogin} className="loginButton btn signInButton" type="submit">Login</Button>
            </section>
            <section className="link--register">
                <Link className="registrationButton" to="/register">Register</Link>
            </section>
        </main>
    )
}