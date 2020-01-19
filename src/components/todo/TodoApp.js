import React, { Component } from "react";
import LoginComponent from "./LoginComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WelcomeComponent from "./WelcomeComponent";
import ListTodoscomponent from "./ListTodosComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent  from "./HeaderComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LogoutComponent from "./LogoutComponent";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router> 
          <HeaderComponent />
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
            <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
            <AuthenticatedRoute path="/todos" component={ListTodoscomponent} />
            <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent />
        </Router>
        {/* <LoginComponent /> */}
      </div>
    );
  }
}

export const ErrorComponent = () => {
  return <div>An Error Occur Fam</div>;
};

export default TodoApp;
