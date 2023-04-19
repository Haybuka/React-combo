## React Hooks

### UseReducer - Basic Usage (UseReducer component)

- setup initial state

```
const initialState = 0

```

- setup a reducer function that the useReducer hook leverages.

```
const countReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {

    case "increment":
      return state = state + 1

    case "decrement":
      return state = state - 1

    case "reset":
      return initialState;

    default:
      return state;
  }
};
```

- Setup useReducer from react, pass in initial state and reducer function.

```
  const [counter, dispatch] = useReducer(countReducer, initialState);

```

- setup jsx and usage

```
    <div>
          <p>{counter}</p>

          <button
            style={{ padding: "10px 15px", border: "none", margin: "0 10px" }}
            onClick={() => dispatch({ type: "increment", payload: 5 })}
          >
            Increase
         </button>
         <button
           style={{ padding: "10px 15px", border: "none", margin: "0 10px" }}
           onClick={() => dispatch({ type: "decrement", payload: 5 })}
         >
           Decrease
         </button>
         <button
           style={{ padding: "10px 15px", border: "none", margin: "0 10px",display:"block" }}
           onClick={() => dispatch({ type: "reset" })}
         >
           Reset
         </button>
    </div>

```

Note - Dispatch function takes in a type in other to properly call the switch. You can also pass various data into dispatch as "Payload" which is accessible in the reducer function.

### UseReducer - With Form fields and complex state (Form Reducer Component)

- The Syntax for this tracks the same, instead of one initial state, there is an object.

```
  const initialStates = {
   username: "",
   password: "",
 };

```

- In switch, It is imperative to spread state in each switch case in other to persist or save other data in state.

```
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
        // can perform api request from here
        //resets the state
        return initialStates;
      default:
       return state;
    }
  };
```

- Each field in the object can be accessed through the reducer value

```
  const [formData, dispatch] = useReducer(formReducer, initialStates);

```


````
      <div>
          <label>Username : {formData?.username}</label>
          <input
             name="username"
             id="username"
             value={formData?.username}
             onChange={(event) =>
               dispatch({ type: "username", payload: event.target.value })
          }
        />
      </div>
 
````

### UseReducer - Multiple reducer
- Multiple useReducers can use the same reducer function. Just rename their output values, and also the dispatch

```
  const [counterOne, dispatchOne] = useReducer(countReducer, initialStateOne);
  const [counterTwo, dispatchTwo] = useReducer(countReducer, initialStateTwo);

```

## Challenge Setup useReducer and Formik (Yup for validation).

### Use reducer and api request.
   This is already setup in the dataFetching component. read through and apply previous knowledge.