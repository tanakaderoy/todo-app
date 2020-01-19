import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CounterButton.css";

class CounterButton extends Component {
  //Define the init state in a constructor
  //state => counter 0
  constructor() {
    super(); //have to call super before calling state
    this.state = {
      counter: 0
    };
    this.increment = this.increment.bind(this);
  }

  render() {
    const { value, countDirection } = this.props;

    return (
      <div className="counterButton">
        <button onClick={() => this.countAction(value, countDirection)}>
          {this.returnValue(value, countDirection)}
        </button>
      </div>
    );
  }
  returnValue = (value, countDirection) => {
    switch (countDirection) {
      case "increment":
        return <>+{value}</>;
      case "decrement":
        return <>-{value}</>;
      default:
        return "Error";
    }
  };
  countAction = (value, countDirection) => {
    switch (countDirection) {
      case "increment":
        this.increment(value);
        break;
      case "decrement":
        this.decrement(value);
        break;
      default:
        return;
    }
  };

  increment = value => {
    const { increment } = this.props;
    increment(value);

    this.setState(prevState => {
      return { counter: prevState.counter + value };
    });
  };
  decrement = value => {
    const { decrement } = this.props;
    decrement(value);
    this.setState(prevState => {
      return { counter: prevState.counter - value };
    });
  };

  reset = () => {
    const {reset} = this.props;
    reset()
this.setState(()=>{
  return {counter:0}
})
  }
}

CounterButton.defaultProps = {
  value: 1,
  direction: "increment"
};
CounterButton.propTypes = {
  value: PropTypes.number,
  direction: PropTypes.string
};
export default CounterButton;
