// uses require as it ws strucutured for vanilla js
const redux = require("redux")
const axios = require("axios")
const reduxLogger = require("redux-logger")
const { default: thunkMiddleWare } = require("redux-thunk")

const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const logger = reduxLogger.createLogger();


const initialState = {
  users: [],
  loading: false,
  error: ''
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:

      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:

      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      }

    case FETCH_USERS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      }

    default:
      return state;
  }

}


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


const store = createStore(reducer, applyMiddleWare(thunkMiddleWare, logger))
const unsubscribe = store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())