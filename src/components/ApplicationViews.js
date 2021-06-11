import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { Protected } from "./auth/Protected"

export const ApplicationViews = () => {
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
            </UserProvider>
        </main>
    </>
}
