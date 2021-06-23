import React from "react"
import { useHistory, Link } from "react-router-dom";
import './Login.css'
import Logo from '../images/PriorityLogo.png'
import { Button } from 'reactstrap';
//This is a form to log an existing user in
export const Login = () => {
    const history = useHistory()
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
    return (
        <main className="container--login centered">
            <img className="loginLogo" src={Logo} alt="priority logo" />
            <section>
                <Button color="primary" onClick={logInAsNickCarver} className="loginButton btn signInButton" type="submit">Sign in as Nick Carver</Button>
            </section>
            <section>
                <Button color="primary" onClick={logInAsLoganLanning} className="loginButton btn signInButton" type="submit">Sign in as Logan Lanning</Button>
            </section>
            <section className="link--register">
                <Link className="registrationButton" to="/register">Register</Link>
            </section>
        </main>
    )
}