import React from "react";
import { Class } from "../../types/api";
import { Link, RouteComponentProps } from "react-router-dom";
import { getClasses } from "../../control/api";

interface ClassListState {
    classes: Class[];
}

export class ClassList extends React.Component<RouteComponentProps, ClassListState> {
    
    state = {
        // Pull from the api
        classes: [] as Class[]
    };

   componentWillMount() {
        this.getClasses();
   }

    getClasses = async () => {
        let classes = await getClasses();
        this.setState({ classes }); 
    }

    createClassList = () => {
        return (
            <table>
                <thead>
                    <tr><td>Class List</td></tr>
                </thead>
                <tbody>
                    {
                        this.state.classes.map(c => 
                            <tr key={c.title}>
                                <td>{c.department}</td>
                                <td>{c.number}</td>
                                <td> - </td>
                                <td>{c.title}</td>
                                <td><Link to="/details"/></td>
                            </tr>          
                        )
                    }
                </tbody>
            </table>
        );
    }

    render() {
        if (this.state.classes.length == 0){
            return <h1>No Classes</h1>
        } else {
            return this.createClassList();
        }
    }
}