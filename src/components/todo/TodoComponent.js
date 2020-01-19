import React, { Component } from "react";
import {} from "react-router-dom";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getTodo, updateTodo, createTodo } from "../../api/Api";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      username: "",
      description: "",
      targetDate: "",
      completed: false
    };
  }
  onSubmit = ({ description, targetDate }) => {
    let username = AuthenticationService.getLoggedInUser();
    const { id } = this.state;
    var date = new Date(targetDate);
    let todo = {
      id: parseInt(id),
      username,
      description,
      targetDate: moment(
        date.toLocaleDateString("en-us", { timeZone: "UTC" })
      ).format("YYYY-MM-DD"),
      completed: false
    };
    if (id === "-1") {
      createTodo(username, todo)
        .then(() => {
          this.props.history.push("/todos");
        })
        .catch(e => console.log(e));
    } else {
      updateTodo(username, id, todo)
        .then(todo => console.log(todo))
        .catch(e => console.log(e))
        .finally(() => this.props.history.push("/todos"));
    }
  };

  validate = ({ description, targetDate }) => {
    let errors = { description: null, targetDate: null };
    errors = !description
      ? {
          ...errors,
          description: "Description should have at least 5 characters"
        }
      : null;
    errors = !moment(targetDate).isValid()
      ? { ...errors, targetDate: "Target date should be set" }
      : null;
    try {
      errors =
        description.length < 5
          ? {
              ...errors,
              description: "Description should have at least 5 characters"
            }
          : null;
    } catch (e) {
      console.log(e);
    }

    return errors;
  };
  componentDidMount() {
    if (this.state.id === "-1") {
      return;
    }
    let user = AuthenticationService.getLoggedInUser();
    getTodo(user, this.props.match.params.id)
      .then(todo => {
        console.log(todo.targetDate);
        this.setState(todo);
        console.log(todo);
      })
      .catch(e => console.log(e));
  }

  render() {
    var { description, targetDate } = this.state;
    targetDate = moment(
      new Date(targetDate).toLocaleDateString("en-us", {
        timeZone: "UTC",
        month: "short",
        weekday: "short",
        year: "numeric",
        day: "numeric"
      })
    ).format("YYYY-MM-DD");
    console.log(description);

    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize
          >
            {props => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <ErrorMessage
                  name="targetDate"
                  component="div"
                  className="alert alert-warning"
                />

                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default TodoComponent;
