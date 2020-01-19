import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Counter.css";
import CounterButton from "./CounterButton";

class Counter extends Component {
  //Define the init state in a constructor
  //state => counter 0
  constructor() {
    super(); //have to call super before calling state
    this.state = {
      counter: 0
    };

    // this.increment = this.increment.bind(this);
  }

  render() {
    return (
      <div className="counter">
        <CounterButton
          value={1}
          countDirection={"increment"}
          increment={this.increment}
          decrement={this.decrement}
          reset={this.reset}
        />
        <CounterButton
          value={5}
          countDirection={"increment"}
          increment={this.increment}
          decrement={this.decrement}
          reset={this.reset}

        />
        <CounterButton
          value={10}
          countDirection={"increment"}
          increment={this.increment}
          decrement={this.decrement}
          reset={this.reset}

        />

       <div>{this.state.counter}</div> 
        <button onClick={this.reset} > Reset</button>

      </div>
    );
  }

  increment = value => {
    this.setState(prevState => {
      return { counter: prevState.counter + value };
    });
  };
  decrement = value => {
    this.setState(prevState => {
      return { counter: prevState.counter - value };
    });
  };

  reset = () => {
      this.setState({counter:0})
  }
}
export default Counter;
