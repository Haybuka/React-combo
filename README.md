## Redux - Concept (vanilla redux)

- Store
  Contains all state (a single object) for a reducer... One store

- Action
  Contains details about the "action" to carry out

- Reducer
  Makes mutation and changes to the store.
  It specify how the app changes in response to actions sent to the store.

## Redux - Action

- An action is an object with type property
- Action creator is a function that returns an action

```
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action"
  }
}

```

## Redux - Reducer

- A function that accepts state and action as arguments, and returns the next state of the application.
- A reducer is a pure function (predictable input,predicatble output)

```
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }
      break;

    default:
      return state;
  }
}
```

## Redux - Store

- Holds Application state.
- Allow access to state via getState()
- Allow state to be updated via dispatch(action)
- registers listener via subscribe(listener) : accepts a function as a parameter which is executed anytime the state in redux changes.
- we can also unsubscribe to the store by calling the value returned from a subscribe(listener) method

```
// require for a node project, import for react
const redux = require("redux ")
const createStore = redux.createStore

const store = createStore(reducer)

```

## Redux - Multiple Reducer

- helps reducer to be readable in large scale apps.
- seperates the initial state, and also the reducers connected.

```
const initialCakeState = {
  numOfCakes: 10,
}

const initialIcecreamState = {
  numOfCakes: 10,
}


const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1
      }

    default:
      return state;
  }
}


const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1
      }

    default:
      return state;
  }
}
```

- let redux know about reducers reated by using the combine reducer, and also rename to "rootReducer.
- the combine reducer takes an object. each key value pair in the object refers to the reducer, and that is how it will be accessed through selector.

  ```
  const combineReducers = redux.combineReducers
  const rootReducer = combineReducers({
  cake : cakeReducer,
  icecream : icecreamReducer
  })
  const store = createStore(rootReducer)
  ```

- when an action is dispatched for a combine reducer, all reducers receive it, but the one with the action only acts on it.

## Redux - Middle Ware

- This is the suggested way to extend redux with custom fiunctionaility.
- It provides a third party extension point between dispatching an action, and the moment it reaches the reducer.
- Can be used for logging, crash reporting and performing asynchronous tasks.
- to use a middle ware, redux library provides a function called applyMiddleWare. You can pass in as many middleware as app requires.

```
// Using redux-logger as a middleware
const reduxLogger = require("redux-logger")

const logger = reduxLogger.createLogger();
const applyMiddleWare = redux.applyMiddleware

const store = createStore(rootReducer, applyMiddleWare(logger))


```

## Redux - Asynchronous Actions.

- setup redux the normal way (store,actions,reducers).
- install axios to manage requests.
- install redux-thunk. Redux thunk (middleware) is the standard way to define action creators asynchronously.

  - it allows an action creator to return a function instead of an action. the function can now perform side effects such as async tasks. this means

  ```
  const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest())
  axios.get("https://jsonplaceholder.typicode.com/users/")
    .then(response => {
      const users = response?.data?.map(user => user.id)
      dispatch(fetchUsersSuccess(users))
    })
    .catch(error => {
      dispatch(fetchUsersFailure(error?.message))
    })
  }
  ```
