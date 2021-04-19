import React from 'react';
import axios from 'axios';


export default class CreateTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description:'',
            owner:'',
            priority:'',
            isCompleted:false,
        }       
    }

    onDescriptionChange = (event)=> {
        this.setState({description:event.target.value});
    }

    onOwnerChange = (event)=> {
        this.setState({owner:event.target.value});
    }

    onPriorityChange = (event)=> {
        this.setState({priority:event.target.value});
    }

    oncompleteStatusChange = (event)=> {
        this.setState({isCompleted:event.target.value});
    }

    onFormSubmit = async (event)=> {
        event.preventDefault();
        console.log('Form submitted');

        const newToDo = {
            description:this.state.description,
            owner:this.state.owner,
            priority:this.state.priority,
            comppletionStatus:this.state.isCompleted,            
        };

        console.log('todo item: ' + JSON.stringify(newToDo));

        await axios.post('http://localhost:4000/todos/add', newToDo)
            .then (res => console.log(res.data))
            .catch(error => {
                console.log('Error while adding the toso' + error);
            });

        this.state = {
            description:'',
            owner:'',
            priority:'',
            isCompleted:false,
        }
        this.props.history.push('/');
    }


    render() {
        return(
            <div style ={{marginTop:10}}>
                <h3>Create new todo</h3>
                <form onSubmit = {this.onFormSubmit}>
                    <div className = "form-group">
                        <label>Description:</label>
                        <input type="text"
                            className = "form-control"
                            value = {this.state.description}
                            onChange = {this.onDescriptionChange} />
                    </div>
                    <div className = "form-group">
                        <label>Owner:</label>
                        <input type="text"
                            className = "form-control"
                            value = {this.state.owner}
                            onChange = {this.onOwnerChange} />
                    </div>
                    <div className = "form-group">
                        <div className="form-check form-check-inline">
                            <input type="radio"
                                className = "form-check-input"
                                name = "priorityOptions"
                                id = "priorityLow"
                                value = "Low"
                                checked = {this.state.priority === 'Low'}                            
                                onChange = {this.onPriorityChange} />
                                <label className = "form-check-lable">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input type="radio"
                            className = "form-check-input"
                            name = "priorityOptions"
                            id = "priorityMedium"
                            value = "Medium"
                            checked = {this.state.priority === 'Medium'}                            
                            onChange = {this.onPriorityChange} />
                            <label className = "form-check-lable">Medium</label>
                            </div>
                            <div className="form-check form-check-inline">
                        <input type="radio"
                            className = "form-check-input"
                            name = "priorityOptions"
                            id = "priorityHigh"
                            value = "High"
                            checked = {this.state.priority === 'High'}                            
                            onChange = {this.onPriorityChange} />
                            <label className = "form-check-lable">High</label>
                            </div>
                    </div>
                    <div className = "form-group">
                        <input 
                            type = "submit" 
                            value = "Create Todo"
                            className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}