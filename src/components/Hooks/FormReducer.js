import React, { useReducer } from "react";

const FormReducer = () => {

  const initialStates = {
    username: "",
    password: "",
  };

  const formReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
      case "username":
        // set up username field
        return { ...state, username: payload };
      case "password":
        // set up password field
        return { ...state, password: payload };
      case "submit":
        console.log(state);
        //resets the state
        return initialStates;
      default:
       return state;
    }
  };

  const [formData, dispatch] = useReducer(formReducer, initialStates);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: "submit", payload: formData });
      }}
    >
      <div>
        <label>Username : {formData?.username}</label>
        <input
          name="username"
          id="username"
          type="text"
          value={formData?.username}
          onChange={(event) =>
            dispatch({ type: "username", payload: event.target.value })
          }
        />
      </div>
      <div>
        <label>Password : {formData?.password}</label>
        <input
          name="password"
          id="password"
          type="password"
          value={formData?.password}
          onChange={(event) =>
            dispatch({ type: "password", payload: event.target.value })
          }
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormReducer;
