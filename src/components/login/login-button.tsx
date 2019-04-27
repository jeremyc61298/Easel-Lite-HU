import React from "react";

interface LoginButtonProps {
    
}

interface LoginButtonState {

}

export class LoginButton extends React.Component<LoginButtonProps, LoginButtonState> {


    render(){
        return (
            <>
                <button type="submit">Login</button>
            </>
        );
    }
}