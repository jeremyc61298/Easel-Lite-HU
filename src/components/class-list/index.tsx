import React from "react";
import { Class } from "../../types/api";
import { Link, RouteComponentProps } from "react-router-dom";
import { getClasses } from "../../control/api";

interface ClassListState {
    classes: Class[];
    loading: boolean;
}

export class ClassList extends React.Component<RouteComponentProps, ClassListState> {
    
    state = {
        // Pull from the api
        classes: [] as Class[],
        loading: true
    };

   async componentDidMount() {
       await this.getClasses();
   }

    getClasses = async () => {
        let classes = await getClasses();
        this.setState({ classes, loading: false }); 
    }

    createClassList = () => {
        return (
            <>
                <h1>Class List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Department</th>
                            <th scope="col">Number</th>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.classes.map(c => 
                                <tr key={c.title}>
                                    <td>{c.department}</td>
                                    <td>{c.number}</td>
                                    <td> - </td>
                                    <td>{c.title}</td>
                                    <td><Link to={`/classes/${c.department}-${c.number}`}>Details</Link></td>
                                </tr>          
                            )
                        }
                    </tbody>
                </table>
            </>
        );
    }

    render() {
        let template: JSX.Element;
        if (this.state.loading){
            return null;
        }
        else if (this.state.classes.length == 0){
            template = <h1>No Classes</h1>;
        } else {
            template = this.createClassList();
        }

        return (
            <>
                {template}
                <Link to="/addclass">Create new class</Link>
            </>
        )
    }
}