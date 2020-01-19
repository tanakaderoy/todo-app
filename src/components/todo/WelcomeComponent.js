import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sampleGet } from "../../api/Api";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    // this.logSomething = this.logSomething.bind(this)
    this.state = {
      id: 0,
      description: "",
      targetDate: new Date().toDateString,
      completed: false,
      errorMessage: '',
      isError: false
    };
  }
  render() {
    return (
      <>
        <h1>Welcome!</h1>
        {this.state.isError && <div className="alert alert-warning">{this.state.errorMessage}</div>}
        <div className="WelcomeComponent container">
          Yurrrrr wash poppin {this.props.match.params.name}? You can manage the
          todos <Link to="/todos">Here</Link>
        </div>
        <div className="container">
          Click Here to get a todo ting
          <button
            className="btn btn-success"
            onClick={() => this.logSomething()}
          >
            Do a get
          </button>
          <div className="container">{this.state.description}</div>
        </div>
      </>
    );
  }
  logSomething = async () => {
    sampleGet()
      .then(todo => {
        console.log("====================================");
        console.log(todo);
        this.handleSuccesResponse(todo);
        console.log("====================================");
      })
      .catch(e => {
        this.handleErrorResponse(e);
      });
  };

  handleSuccesResponse = todo => {
    this.setState({...todo,todo,isError:false});
  };
  handleErrorResponse(e) {
    console.log(`Error: ${e.message}`);
    this.setState({errorMessage: e.message,
      isError: true
    })
  }
}

export default WelcomeComponent;
