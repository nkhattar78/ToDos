import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import  TodosList from './components/todoslist';
import  CreateTodo from './components/createtodo';
import  EditTodo from './components/edittodo';
import logo from './todoLogo.png';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className = "navbar navbar-expand-lg navar-light bg-light">
            <a className = "navbar-brand" href = "https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1/" target = "_blank">
              <img src = {logo} width ="30" height = "30" alt ="To do app logo" />
            </a> 
            <Link to="/" className = "navbar-brand">Todo app using MERN stack</Link>
            <div className = "collapse navbar-collapse">
            <ul className = "navbar-nav mr-auto">
              <li className = "navbar-item">
                <Link to="/" className ="nav-link"> Todos</Link>
              </li>
              <li className = "navbar-item">
                <Link to="/create" className ="nav-link">Create Todos</Link>
              </li>
            </ul>
            </div>
          </nav>
          <br/>
          <Route path = "/" exact component = {TodosList}/>
          <Route path = "/edit/:id" component = {EditTodo}/>
          <Route path = "/create" exact component = {CreateTodo}/>
        </div>
      </Router>     
    );
  }
}
export default App;
