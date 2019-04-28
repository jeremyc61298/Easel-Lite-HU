import React from "react";
import { LoginInput } from "./login-input";
import { LoginButton } from "./login-button";
import "./login.css";

interface LoginProps {

}

interface LoginState {

}

export class Login extends React.Component<LoginProps, LoginState> {


    render() {
        return (
            <div id = "login">
                <h1>Welcome to Easel Lite!</h1> 
                <form method="POST">
                    <LoginInput type="Username"/>
                    <LoginInput type="Password"/>
                    <LoginButton/> 
                </form>
            </div>
        );
    }
}