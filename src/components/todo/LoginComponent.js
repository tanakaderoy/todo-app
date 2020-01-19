import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "tanaka",
      password: "123",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  loginClicked = () => {
    const { username, password } = this.state;
    // AuthenticationService.executeBasicAuth(username, password)
    //   .then(() => {
    //     this.props.history.push(`/welcome/${username}`);
    //     AuthenticationService.registerSuccessfulLogin(username, password);
    //     this.setState({ showSuccessMessage: true, hasLoginFailed: false });
    //   })
    //   .catch(e => {
    //     this.setState({ hasLoginFailed: true, showSuccessMessage: false });
    //   });
      AuthenticationService.executePostJWTToken(username, password)
      .then((resp) => {
        AuthenticationService.registerSuccessfulLoginForJWT(username, resp.token);
        this.props.history.push(`/welcome/${username}`);
        // this.setState({ showSuccessMessage: true, hasLoginFailed: false });
      })
      .catch(e => {
        this.setState({ hasLoginFailed: true, showSuccessMessage: false });
      });
    // if (username === "tanaka" && password === "123") {
    //     this.props.history.push(`/welcome/${username}`)
    //     AuthenticationService.registerSuccessfulLogin(username,password)
    //   this.setState({ showSuccessMessage: true, hasLoginFailed: false });
    // } else {
    //   this.setState({ hasLoginFailed: true, showSuccessMessage: false });
    // }
  };
  handleTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    // switch (event.target.name) {
    //   case "username":
    //     this.setState({ username: event.target.value });
    //     break;
    //   case "password":
    //     this.setState({ password: event.target.value });
    //     break;
    //   default:
    //     break;
    // }
  };

  render() {
    const {
      hasLoginFailed,
      showSuccessMessage,
      username,
      password
    } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <div className="LoginComponent container">
          <ShowCredentialsResponse
            showSuccessMessage={showSuccessMessage}
            hasLoginFailed={hasLoginFailed}
          />
          User Name:
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleTextChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleTextChange}
          />
          <button className="btn btn-success" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
function ShowCredentialsResponse(props) {
  const { hasLoginFailed, showSuccessMessage } = props;
  if (hasLoginFailed) {
    return <div className="alert alert-warning">Login Failed </div>;
  } else if (showSuccessMessage) {
    return <div>Login Successful </div>;
  }
  return null;
}

export default LoginComponent;
