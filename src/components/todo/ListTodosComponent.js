import React, { Component } from "react";
import { retrieveAllTodos, deleteTodo } from "../../api/Api";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodoscomponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null
    };
  }
  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div className="ListTodos">
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <h1>ListTodos</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>description</th>
                <th>completed</th>
                <th>target date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.completed.toString()}</td>
                  <td>
                    {moment(
                      new Date(todo.targetDate).toLocaleDateString("en-us", {
                        timeZone: "UTC",
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit"
                      })
                    ).format("MMM. D, YYYY")}
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.peformTodoUpdate(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.peformTodoDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.peformTodoAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
  createNewTodo = () => {};
  getTodos = () => {
    retrieveAllTodos(AuthenticationService.getLoggedInUser())
      .then(todos => {
        this.handleSuccesfulTodosResponse(todos);
      })
      .catch(e => this.handleErrorResponse(e));
  };
  peformTodoAdd = () => {
    this.props.history.push(`/todos/-1`);
  };

  peformTodoUpdate = id => {
    this.props.history.push(`/todos/${id}`);
  };

  peformTodoDelete = id => {
    const userName = AuthenticationService.getLoggedInUser();
    deleteTodo(userName, id)
      .then(() => {
        this.setState({ message: `Delete of todo ${id}` });
        this.getTodos();
      })
      .catch(e => console.log(e));
  };
  handleSuccesfulTodosResponse = todos => {
    this.setState({ todos: todos });
  };
  handleErrorResponse = error => {
    console.log(error);
  };
}

export default ListTodoscomponent;
