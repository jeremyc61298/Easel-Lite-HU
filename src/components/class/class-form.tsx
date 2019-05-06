import React, { MouseEvent } from "react";
import { User, Class } from "../../types/api";
import { getTeachers } from "../../control/api";
import "./class.css";

export interface ClassFormState {
    department: string;
    number: number;
    title: string;
    currentTeacher: string; // UserId of the teacher
    teachers: User[];
}

interface ClassFormProps {
    currentClass?: Class;
    deleteClass?(): void;
    cancel(formState: ClassFormState): void;
    saveClass(formState: ClassFormState): void;
    stateChanged(formState: ClassFormState): boolean;
}

export class ClassForm extends React.Component<ClassFormProps, ClassFormState> {

    constructor(props: ClassFormProps) {
        super(props);
        let currentClass = this.props.currentClass;
        if (currentClass) {
            this.state = {
                department: currentClass.department,
                number: currentClass.number,
                title: currentClass.title,
                currentTeacher:  currentClass.teacher._id,
                teachers: [] as User[]
            }
        } else {
            this.state = {
                department: "",
                number: 0,
                title: "",
                currentTeacher: "",
                teachers: [] as User[]
            }
        }
    }

    async componentDidMount() {
        await this.populateTeachersIntoState();
    }

    populateTeachersIntoState = async () => {
        let teachers = await getTeachers();
        this.setState({teachers});

        if (this.state.currentTeacher == ""){
            this.setState({currentTeacher: teachers[0]._id})
        }
    };

    updateDepartment = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({department: evt.target.value});
    };

    updateNumber = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({number: Number(evt.target.value)});
    };

    updateTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({title: evt.target.value});
    };

    updateTeacher = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({currentTeacher: evt.currentTarget.value});
    };

    didStateChange = () => {
        return this.props.stateChanged(this.state);
    }

    commitChanges = (evt: MouseEvent<HTMLButtonElement>) => {
        if (evt.currentTarget.id == "delete") {
            this.props.deleteClass!();
        } else if (evt.currentTarget.id == "cancel") {
            this.props.cancel(this.state);
        } else if (evt.currentTarget.id == "save") {
            this.props.saveClass(this.state);
        }
    };

    render() {
        return (
            <div id="classForm" className="card" style={{width: "36rem"}}>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="dept">Department</label>
                            <input className="form-control" name="dept" type="text" value={this.state.department} onChange={this.updateDepartment}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Number</label> 
                            <input className="form-control" name="number" type="number" value={this.state.number || ""} onChange={this.updateNumber}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className="form-control" name="title" type="text" value={this.state.title} onChange={this.updateTitle}/>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="teacher">Teacher</label>
                            <select className="form-control" name="teacher" value={this.state.currentTeacher} onChange={this.updateTeacher}>
                                { 
                                    this.state.teachers.map((t, i) => 
                                    <option key={i} value={t._id}>
                                                {t.firstname} {t.lastname}
                                            </option>
                                        )
                                    }
                            </select>
                        </div>
                    </form>
                    <div id="submitButtons" className="btn-group" role="group">
                        {
                            this.props.deleteClass ? 
                            <button className="btn btn-danger" id="delete" type="button" onClick={this.commitChanges}>Delete</button> :
                            <></>
                        }
                    
                        <button className="btn btn-secondary" id="cancel" type="button" onClick={this.commitChanges}>Cancel</button>
                        <button className="btn btn-primary" id="save" type="button" 
                            onClick={this.commitChanges} 
                            disabled={this.didStateChange() ? false : true}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}