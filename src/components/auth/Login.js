import React from "react"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
        <main className="container--login">
            <section>
                <form className="form--login" >
                    <h1>Priority</h1>
                    <button onClick={logInAsNickCarver} className="btn signInButton" type="submit">Sign in as Nick Carver</button>
                    <button onClick={logInAsLoganLanning} className="btn signInButton" type="submit">Sign in as Logan Lanning</button>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}