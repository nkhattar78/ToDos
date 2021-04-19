import axios from 'axios';
import React from 'react';

export default class EditTodo extends React.Component {
constructor(props) {
    super(props);
    console.log('todo is : ' + this.props.match.params.id);
    
    // Need to make this function as async. Created this function as a regular function and so need to bind as we are accessing state which is related to this in the function.
    // Other option is to create an arrowa async function.
    //this.onFormSubmit = this.onFormSubmit.bind(this); Current using the async arrow function for form submission and so binding is not required.
    this.state = {
        description:'',
        owner:'',
        priority:'',
        isCompleted:false,
    }
}

componentDidMount() {
    const todoUrl = 'http://localhost:4000/todos/' +  this.props.match.params.id;
    console.log('todo url: ' + todoUrl);

    axios.get(todoUrl)
    .then(response => {
        this.setState({
            description:response.data.description,
            owner:response.data.owner,
            priority:response.data.priority,
            isCompleted:response.data.comppletionStatus,
            })
    })
    .catch(error => {
        console.log('Error while fetching todo details: ' + error);
    })

}

onChangeTodoDesc = (event) =>{
    this.setState({description:event.target.value});
}

onChangeTodoOwnership = (event) =>{
    this.setState({owner:event.target.value});
}

onChangeTodoPriority = (event) =>{
    this.setState({priority:event.target.value});
}

onChangeTodoCompleted = (event) =>{
    this.setState({isCompleted:!this.state.isCompleted});
}

 
 onFormSubmit = async (event) =>{
    event.preventDefault();

    const todoObj = {
        description:this.state.description,
        owner:this.state.owner,
        priority:this.state.priority,
        comppletionStatus:this.state.isCompleted,
    }
    
    console.log('todo going to be updated: ' + JSON.stringify(todoObj));
    const todoUpdateUrl = 'http://localhost:4000/todos/update/' +  this.props.match.params.id;
    console.log('todo update url: ' + todoUpdateUrl);
    await axios.post(todoUpdateUrl, todoObj)
        .then(response => {
            console.log('Todo updated successfully. ' + JSON.stringify(response.data));
        })
        .catch (error => {
            console.log('Error while updating todo: ' + error);
        })

    this.props.history.push('/');
}

onTodoDeletion = async (event) => {
    console.log('todo going to be deleted:');
    const todoUpdateUrl = 'http://localhost:4000/todos/delete/' +  this.props.match.params.id;
    console.log('todo update url: ' + todoUpdateUrl);
    await axios.delete(todoUpdateUrl)
        .then(response => {
            console.log('Todo deleted successfully. ' + JSON.stringify(response.data));
        })
        .catch (error => {
            console.log('Error while deleting todo: ' + error);
        })

    this.props.history.push('/');
}

    render() {
        return(
            <div>
                <h3 align = 'center'>Update Todo</h3>
                <form onSubmit = {this.onFormSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input type = "text"
                        className = "form-control"
                        value = {this.state.description}
                        onChange = {this.onChangeTodoDesc}/>
                    </div>
                    <div className="form-group">
                        <label>Responsible:</label>
                        <input type = "text"
                        className = "form-control"
                        value = {this.state.owner}
                        onChange = {this.onChangeTodoOwnership}/>
                    </div>
                    <div className = "form-group">
                        <div className = "form-check form-input-inline">
                            <input className = "form-check-input"
                            type = "radio"
                            id = "priorityLow"
                            value = "Low"
                            checked = {this.state.priority === 'Low'}
                            onChange = {this.onChangeTodoPriority}/>
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className = "form-check form-input-inline">
                            <input className = "form-check-input"
                            type = "radio"
                            id = "priorityMedium"
                            value = "Medium"
                            checked = {this.state.priority === 'Medium'}
                            onChange = {this.onChangeTodoPriority}/>
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className = "form-check form-input-inline">
                            <input className = "form-check-input"
                            type = "radio"
                            id = "priorityHigh"
                            value = "High"
                            checked = {this.state.priority === 'High'}
                            onChange = {this.onChangeTodoPriority}/>
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                        id = "completedCheckbox"
                        type = "checkbox"
                        name = "completedCheckbox"
                        onChange = {this.onChangeTodoCompleted}
                        checked = {this.state.isCompleted}
                        value = {this.state.isCompleted}/>
                        <label className="form-check-label" htmlFor = "completedCheckbox">
                            Completed
                        </label>
                        
                        <div className = "form-group">
                            <div className="form-check form-check-inline">
                                <input type = "submit"
                                value = "Update Todo"
                                className = "btn btn-primary"/>
                            </div>

                            <div className="form-check form-check-inline">
                                <button className = "btn btn-primary"
                                onClick = {this.onTodoDeletion}>  
                                    Delete Todo
                                </button>
                            </div>
                        </div>
                        
                    </div>

                </form>
            </div>
        );
    }
}