import React, { useReducer, useState } from "react";

const UseReducer = () => {
  const initialState = {
    firstCount : 1,
    name : 'Paschal'
  };
  const [count, setCount] = useState(0);
  const countReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
      case "increment":
        return {...state, firstCount : state.firstCount + payload};
      case "decrement":
        return {...state, firstCount : state.firstCount - payload};

      case "reset":
        return initialState;
      default:
        return state;
    }
  };
  const [counter, dispatch] = useReducer(countReducer, initialState);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{ padding: "10px 15px", border: "none", margin: "0 10px" }}
          onClick={() => dispatch({ type: "increment", payload: 5 })}
        >
          Increase
        </button>
        <p>{counter.firstCount}</p>
        <p>{counter.name}</p>
        <button
          style={{ padding: "10px 15px", border: "none", margin: "0 10px" }}
          onClick={() => dispatch({ type: "decrement", payload: 5 })}
        >
          Decrease
        </button>
      </div>
      <button
        style={{ padding: "10px 15px", border: "none", margin: "0 10px",display:"block" }}
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
};

export default UseReducer;
