import React from "react";

interface LoginInputProps {
    label: string;
    value: string;
    id: string;
}

interface LoginInputState {

}

export class LoginInput extends React.Component<LoginInputProps, LoginInputState> {


    render(){
        return (
            <div>
                <label htmlFor={this.props.type}>{`${this.props.type}:`}</label>
                <input type={(this.props.type == "Password")? "password" : "text"} name={this.props.type}/>
            </div>
        );
    }
}