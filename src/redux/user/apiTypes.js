//start with types
//second with action creators
//end with reducer
//then combine reducers
// work thunks and api request 
// Thunk allows an action creator be able to perform side effects and dispatchs. this is handled by the reducer and updates component.

export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_ERROR = "FETCH_ERROR"
export const FETCH_lOADING = "FETCH_LOADING"