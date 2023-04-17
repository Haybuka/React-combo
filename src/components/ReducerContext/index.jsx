import React, { useContext } from "react";
import { ReducerContext } from "../../context/ReducerContext";

const ReducerWithContext = () => {
  const { count, dispatch } = useContext(ReducerContext);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        Add 5
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 10 })}>
        subtract 10
      </button>
    </div>
  );
};

export default ReducerWithContext;
