import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./components/login";

window.addEventListener("DOMContentLoaded", () => {
    let template = 
        <>
            <Login/>
        </>
    ReactDOM.render(template, document.getElementById("root"));
})