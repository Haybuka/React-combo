import React, { useReducer, useEffect } from "react";
import { _dataFetching } from "../../api/dataFetching";

const DataFetching = () => {
  const initialState = {
    post: [],
    error: "",
    isLoading: "",
  };

  const DataTypes = {
    IS_LOADING: "IS_LOADING",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case DataTypes.IS_LOADING:
        return { ...state, isLoading: payload };
      case DataTypes.FETCH_SUCCESS:
        return { error: "", isLoading: false, post: payload };
      case DataTypes.FETCH_ERROR:
        return { post: [], isLoading: false, error: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { post, isLoading, error } = state;

  const dataFetching = async () => {
    dispatch({ type: "IS_LOADING", payload: true });

    try {
      const response = await _dataFetching();
      if (response.status === 200) {
        dispatch({ type: "FETCH_SUCCESS", payload: response });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "FETCH_ERROR", payload: error.message });
      //   console.log(state);
    }

    dispatch({ type: "IS_LOADING", payload: false });
  };

  useEffect(() => {
    dataFetching();
  }, []);
  console.log(post)
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <section>{!error ? <p>no error</p> : <p>{error}</p>}</section>
  );
};

export default DataFetching;
