import React, { useContext, useEffect, useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { UserContext, UserProvider } from "./users/UserProvider"
import { Protected } from "./auth/Protected"
import { Loading } from "./nav/Loading"
import { Profile } from "./profile/Profile"
import { ProfileProvider } from "./profile/ProfileProvider"
import { Community } from "./users/Community"

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
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <UserProvider>
                <ProfileProvider>
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
                    <Route exact path="/profiles/:profileId(\d+)">
                        <Protected>
                            <Profile />
                        </Protected>
                    </Route>
                    <Route exact path="/profile/edit">
                        <Protected>
                        </Protected>
                    </Route>
                    <Route exact path="/loading">
                        {serverIsLoading && <Loading />}
                    </Route>
                </ProfileProvider>
            </UserProvider>
        </main>
    </>
}
