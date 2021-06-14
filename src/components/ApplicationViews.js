import React, { useContext, useEffect, useState } from "react"
import { Route, useHistory } from "react-router-dom"
import { UserContext, UserProvider } from "./users/UserProvider"
import { Protected } from "./auth/Protected"
import { Loading } from "./nav/Loading"

export const ApplicationViews = () => {
    const { serverAwake } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        debugger
        if (serverAwake) {
            debugger
            history.push("/")
        }
    }, [serverAwake])

    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <UserProvider>
                <Route exact path="/">
                    <Protected>
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
                    {!serverAwake && <Loading />}
                </Route>
            </UserProvider>
        </main>
    </>
}
