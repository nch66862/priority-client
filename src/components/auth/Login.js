import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
//This is a form to log an existing user in
export const Login = () => {
    const { logUserIn } = useContext(UserContext)
    //useHistory keeps track of the URL visted in a URL stack
    const history = useHistory()
    //functions used for demo website
    const logInAsNickCarver = (event) => {
        event.preventDefault()
        logUserIn({
            username: "nickcarver74@gmail.com",
            password: "pass"
        })
        history.push("/loading")
    }
    const logInAsLoganLanning = (event) => {
        event.preventDefault()
        logUserIn({
            username: "loganlanning",
            password: "pass"
        })
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