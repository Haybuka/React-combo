import React, { createContext, useState,useReducer } from "react";
import { reducer } from "../reducer/reducer";

export const ReducerContext = createContext();
export const ReducerContextProvider = ({ children }) => {
    const initialState = 0;
  const [count, dispatch] = useReducer(reducer,initialState);
  console.log(count)
  return (
    <ReducerContext.Provider value={{ count, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};
