import React, { useReducer, useEffect } from "react";
import { _dataFetching } from "../../api/dataFetching";

const DataFetching = () => {
  const initialState = {
    posts: [],
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
        return { error: "", isLoading: false, posts: payload };
      case DataTypes.FETCH_ERROR:
        return { posts: [], isLoading: false, error: payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, isLoading, error } = state;

  const dataFetching = async () => {
    dispatch({ type: "IS_LOADING", payload: true });

    try {
      const response = await _dataFetching();
      if (response.status === 200) {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }

    dispatch({ type: "IS_LOADING", payload: false });
  };

  useEffect(() => {
    dataFetching();
  }, []);
  return isLoading ? (
    <p>Loading</p>
  ) : (
        !error ? (
        <ul style={{listStyle:"none"}}>
        {
            posts.map( post => (
                <li key={post.id}>
                   <section style={{padding:"19px 15px",margin:"10px 0",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"1px 1px 5px #000 "}}>
                   <div>
                        <h3>{post.name}</h3>
                        <p>{post.username}</p>
                    </div>
                    <div>
                        <h3>{post.email}</h3>
                        <p>{post.phone}</p>
                    </div>
                   </section >
                </li>
            ))
        }
    </ul>
    ) : <p>{error}</p>
  );
};

export default DataFetching;
