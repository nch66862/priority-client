import React, { useContext, useEffect, useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { UserContext, UserProvider } from "./users/UserProvider"
import { Protected } from "./auth/Protected"
import { Loading } from "./nav/Loading"
import { Profile } from "./profile/Profile"

export const ApplicationViews = () => {
    const { logUserIn } = useContext(UserContext)
    const loggedInUser = localStorage.getItem("logged_in_user")
    const [loggedInUserObj, setLoggedInUserObj] = useState({})
    const [serverIsLoading, setServerIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        let currentUser = {}
        if (loggedInUser === "Nick") {
            currentUser = {
                username: "nickcarver74@gmail.com",
                password: "pass"
            }
        }
        else if (loggedInUser === "Logan") {
            currentUser = {
                username: "loganlanning",
                password: "pass"
            }
        }
        logUserIn(currentUser)
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("priority_user_token", res.token)
                    setLoggedInUserObj(res)
                }
            })
    }, [])
    useEffect(() => {
        if (loggedInUserObj.valid) {
            setServerIsLoading(false)
            history.push("/")
        }
    }, [loggedInUserObj])
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <UserProvider>
                <Route exact path="/">
                    <Protected>
                        <Profile />
                    </Protected>
                </Route>
                <Route exact path="/community">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/leaderboard">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/subscriptions">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/priority/edit">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/what/edit/:whatId(\d+)">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/profile/edit">
                    <Protected>
                    </Protected>
                </Route>
                <Route exact path="/loading">
                    {serverIsLoading && <Loading />}
                </Route>
            </UserProvider>
        </main>
    </>
}
