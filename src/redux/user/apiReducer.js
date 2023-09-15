import { FETCH_ERROR, FETCH_SUCCESS, FETCH_lOADING } from "./apiTypes"

const initialState = {
  users: [],
  loading: false,
  error: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_lOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        users: action.payload
      }

    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: []
      }
    default:
      return state
  }
}

export default userReducer