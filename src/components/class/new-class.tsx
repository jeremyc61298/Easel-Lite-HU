import React from "react";
import { ClassFormState, ClassForm } from "./class-form";
import { RouteComponentProps } from "react-router";
import { Class, CreateableClass } from "../../types/api";
import { postClass } from "../../control/api";

export class NewClass extends React.Component<RouteComponentProps, {}> {

    stateChanged = (formState: ClassFormState) => {
 
        if (formState.currentTeacher !== "" ||
            formState.department !== "" ||
            formState.number !== 0 ||
            formState.title !== "") {
                // State of the form has changed since request
                return true
            }
            return false;
    }

    cancel = (formState: ClassFormState) => {
        if (this.stateChanged(formState)) {
            if (window.confirm("Discard changes?")) {
                // Redirect
                this.props.history.push("/classes");
            }
        } else {
            this.props.history.push("/classes");
        }
    }

    saveClass = async (formState: ClassFormState) => {
        let newClass: CreateableClass = {
            _id: "",
            department: formState.department,
            number: formState.number!,
            title: formState.title,
            teacher: formState.currentTeacher
        }

        await postClass(newClass);
        this.props.history.push("/classes");
    }

    render() {
        return (
            <>
                <h1>New Class</h1>
                <ClassForm cancel={this.cancel} saveClass={this.saveClass} stateChanged={this.stateChanged} />
            </>
        );
    }
}