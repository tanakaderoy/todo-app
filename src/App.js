import React, { Component } from "react";
import "./App.css";
import "../src/bootstrap.css"
// import FirstComponent from "./components/examples/FirstComponent";
// import ThirdComponent from "./components/examples/ThirdComponent";
import TodoApp from "./components/todo/TodoApp";


class App extends Component {
 render() {
   return(
<div className="App">
  {/* <Counter /> */}
  
  <TodoApp />
</div>
);
 }
}

// class LearningComponents extends Component {
//  render() {
//     return (
//       <div className="LearningComponents">
//         <h1> my react app</h1>
//         <FirstComponent />
//         <ThirdComponent />
//       </div>
//     );
//   }
// }

export default App;

// //
// import React, { Component, useState } from "react";
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         my react app
//         <FirstComponent />
//       </div>
//     );
//   }
// }
// //Class component
// class FirstComponent extends Component {

//   render() {
//     const [count,setCount] = useState(0)
//     return <div className="firstCompenent">FirstComponent
//     <text>Count: {count}</text>
//     <button title="increase" onClick={()=> {setCount(count+ 1)}} />
//     <button title="decrease" onClick={()=> {setCount(count- 1)}} />
//     </div>;
//   }
// }

// export default App;

// ******************************************************************************
// import React, { Component, useState, useReducer } from "react";
// import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         my react app
//         <FirstComponent />
//       </div>
//     );
//   }
// }
// //Class component
// class FirstComponent extends Component {
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "increase":
//         return { ...state, value: state.value + 1 };
//       case "decrease":
//         return state.value > 0 ? { ...state, value: state.value - 1 } : state;
//       default:
//         return state;
//     }
//   };

//   render() {

//     const [state, dispatch] = useReducer(reducer, { value: 0 });
//     return <div className="firstCompenent">FirstComponent
//     <text>Count: {state.value}</text>
//     <button title="increase" onClick={()=> { dispatch({ type: "increase" });
// }} />
//     <button title="decrease" onClick={()=> {dispatch({ type: "decrease" })}} />
//     </div>;
//   }
// }

// export default App;
