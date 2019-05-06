import React from "react";

interface NavBarState {
    logoutBtnHidden: boolean;
}

export class NavBar extends React.Component<{}, NavBarState> {
    state = {
        logoutBtnHidden: true
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom: "1rem", marginTop: "1rem"}}>
                <span className="navbar-brand mb-0 h1">Easel-Lite</span>
            </nav>
        );
    }

}