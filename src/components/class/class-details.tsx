import React, { ChangeEvent } from "react";
import { RouteComponentProps } from "react-router";
import { ClassForm, ClassFormState } from "./class-form";
import { Class, CreateableClass } from "../../types/api";
import { getClass, deleteClass, updateClass } from "../../control/api";
import "./class.css";

interface ClassDetailsState {
    currentClass: Class | null;
    loading: boolean;
}

interface ClassDetailsRouterProps {
    classdept: string;
    classnum: string;
}

export class ClassDetails extends React.Component<RouteComponentProps<ClassDetailsRouterProps>, ClassDetailsState> {

    state = {
        currentClass: {} as Class,
        loading: true
    }

    async componentDidMount() {
        await this.populateClassIntoState();
    }

    populateClassIntoState = async () => {
        let params = this.props.match.params;
        let c = await getClass(params.classdept, params.classnum);
        
        if (c) {
            this.setState({currentClass: c, loading: false});
        }
    }

    stateChanged = (formState: ClassFormState) => {
        let oldClass = this.state.currentClass;
        if (formState.currentTeacher !== oldClass.teacher._id ||
            formState.department !== oldClass.department ||
            formState.number !== oldClass.number ||
            formState.title !== oldClass.title) {
                // State of the form has changed since request
                return true
            }
            return false;
    }

    deleteClass = async () => {
        if (window.confirm("Delete class?")) {
            await deleteClass(this.state.currentClass._id);
            this.props.history.push("/classes");
        }
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
        let updatedClass: CreateableClass = {
            _id: this.state.currentClass._id,
            department: formState.department,
            number: formState.number!,
            title: formState.title,
            teacher: formState.currentTeacher
        }
        console.log(updatedClass)
        await updateClass(updatedClass);
        this.props.history.push("/classes");
    }

    render() {
        if (this.state.loading) {
            return null;
        } else {
            return (
                !this.state.currentClass ? <h1>Class not found</h1> : 
                <>
                    <h1>Class Details</h1>     
                    <ClassForm 
                        currentClass={this.state.currentClass}
                        deleteClass={this.deleteClass}
                        cancel={this.cancel}
                        saveClass={this.saveClass}
                        stateChanged={this.stateChanged}
                    />
                </>
            );
        }
    }
}