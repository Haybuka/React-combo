import { FETCH_ERROR, FETCH_SUCCESS, FETCH_lOADING } from "./apiTypes"



export const fetchSuccess = (payload) => {
  return {
    type: FETCH_SUCCESS,
    payload
  }
}

export const fetchError = (payload) => {
  return {
    type: FETCH_ERROR,
    payload
  }
}

export const fetchLoading = () => {
  return {
    type: FETCH_lOADING
  }
}