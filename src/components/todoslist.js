import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class TodosList extends React.Component {
constructor(props) {
    super(props);
    this.state = {todos:[]}
    console.log('todos list home page constructor');
}

componentDidMount() {
    console.log('todos list home page componentDidMount');
    axios.get('http://localhost:4000/todos')
    .then(response => {
        this.setState({todos:response.data});
        console.log('Todos count: ' + this.state.todos.length);
        console.log('todos list: ' + JSON.stringify(this.state.todos));
    })
    .catch(error => {
        console.log('Error in fetching todos list');
    })
}

todoList() {
    return this.state.todos.map(function(currentTodo, i) {
        return <Todo currTodo = {currentTodo} key = {i}/>;
    })
}

    render() {
        return(
            <div>
                <h3>Todos List</h3>
                <table className = "table table-striped" style = {{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const Todo = props=>(
    <tr>
        <td className = {props.currTodo.comppletionStatus ? 'completed': ''}> {props.currTodo.description} </td>
        <td className = {props.currTodo.comppletionStatus ? 'completed': ''}>{props.currTodo.owner}</td>
        <td className = {props.currTodo.comppletionStatus ? 'completed': ''}>{props.currTodo.priority}</td>
        <td>
            <Link to={"/edit/" + props.currTodo._id}>Edit</Link>
        </td>        
    </tr>
)
 