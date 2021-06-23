import React, { useContext, useEffect, useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { UserContext } from "./users/UserProvider"
import { Protected } from "./auth/Protected"
import { Loading } from "./nav/Loading"
import { Profile } from "./profile/Profile"
import { Community } from "./users/Community"
import { AffirmationProvider } from "./profile/affirmation/AffirmationProvider"
import { SubscriptionList } from "./users/SubscriptionList"

export const ApplicationViews = () => {
    const { logUserIn } = useContext(UserContext)
    const loggedInUser = localStorage.getItem("logged_in_user")
    const [loggedInUserObj, setLoggedInUserObj] = useState({})
    const [serverIsLoading, setServerIsLoading] = useState(true)
    const history = useHistory()
    useEffect(() => {
        if (history.location.pathname === "/loading") {
            let currentUser = {}
            if (loggedInUser === "Nick") {
                currentUser = {
                    username: "nick@nickcarver.com",
                    password: "pass"
                }
            }
            else if (loggedInUser === "Logan") {
                currentUser = {
                    username: "logan@loganlanning.com",
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
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (loggedInUserObj.valid) {
            setServerIsLoading(false)
            history.push("/")
        }
        // eslint-disable-next-line
    }, [loggedInUserObj])
    return <>
        <main style={{
            margin: "1rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <AffirmationProvider>
                <Route exact path="/">
                    <Protected>
                        <Profile />
                    </Protected>
                </Route>
                <Route exact path="/community">
                    <Protected>
                        <Community />
                    </Protected>
                </Route>
                <Route exact path="/subscriptions">
                    <Protected>
                        <SubscriptionList />
                    </Protected>
                </Route>
                <Route exact path="/profiles/:profileId(\d+)">
                    <Protected>
                        <Profile />
                    </Protected>
                </Route>
                <Route exact path="/loading">
                    {serverIsLoading && <Loading />}
                </Route>
            </AffirmationProvider>
        </main>
    </>
}
