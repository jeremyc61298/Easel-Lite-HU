import React, { ChangeEvent, FormEvent } from "react";
import "./login.css";
import { postLogin } from "../../control/api";
import { setToken } from "../../control/session";
import { RouteComponentProps } from "react-router";

interface LoginState {
    username: string;
    password: string;
    status: string;
}

export class Login extends React.Component<RouteComponentProps, LoginState> {

    state = {
        username: "",
        password: "",
        status: ""
    };

    onLoginAttempt = async (evt: FormEvent) => {
        evt.preventDefault();
        try {
            const token = await postLogin(this.state.username, this.state.password);

            if (token) {
                // Place it in the session
                setToken(token);
                this.setState({status: ""});
                this.props.history.push("/classes");
            } else {
                // Let the user know that login failed
                this.setState({status: "Invalid username/password"});
            }
        } catch (err) {
            console.log(err);
        }
    };

    updateUsername = (evt: ChangeEvent<HTMLInputElement>) => {
        this.setState({username: evt.target.value});
    };

    updatePassword = (evt: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: evt.target.value});
    }

    render() {
        return (
            <>
                <h1>Welcome to Easel-Lite!</h1>
                <div id = "login">
                    <h3>Login</h3> 
                    <div id="status">{this.state.status}</div>
                    <form onSubmit={this.onLoginAttempt}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" onChange={this.updateUsername}/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={this.updatePassword}/>
                        <button type="submit">Login</button> 
                    </form>
                </div>
            </>
        );
    }
}