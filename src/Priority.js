import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { NavBar } from "./components/nav/NavBar";
import { Footer } from "./components/footer/Footer";
import { UserProvider } from "./components/users/UserProvider";
import { ApplicationViews } from "./components/ApplicationViews";
import { Protected } from "./components/auth/Protected";
//the application component. will handle routing to the application views if the user is logged in, or the login page if a user is not logged in
export const Priority = () => (
    <>
        <Route
            render={() => {
                if (sessionStorage.getItem("Priority_User")) {
                    return (
                        <>
                            <section className="mainBody">
                                <UserProvider>
                                    <Protected>
                                        <NavBar />
                                    </Protected>
                                    <ApplicationViews />
                                </UserProvider>
                            </section>
                            <Footer />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
)