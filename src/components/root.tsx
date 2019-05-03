// Root component for Easel-Lite
import React, { ComponentType } from "react";
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { Login } from "./login";
import { tokenExpired } from "../control/jwt";
import { ClassList } from "./class-list";
import { NotFound } from "./notFound";

export function requireLogin(Component: ComponentType<any>) {
    return (props: RouteComponentProps) => {
        if (tokenExpired()){
            // Redirect them to the login page
            console.log("redirecting to /login"); 
            return <Redirect to="/login"/>
        } else {
            // They are authenticated still, render the component
            return <Component {...props}/>
        }
    };
}

export function Root() {
    return (
        <BrowserRouter basename="/">
            <Switch>    
                <Route path="/login" component={Login}/>  
                <Route path="/classes" exact render={requireLogin(ClassList)}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}