import axios from "axios"
import { fetchError, fetchLoading, fetchSuccess } from "./apiActions"

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchLoading)
    axios.get("https://jsonplaceholder.typicode.com/users/")
      .then(response => {
        // const users = response?.data?.map(user => user.id)
        const users = response?.data
        dispatch(fetchSuccess(users))
      })
      .catch(error => {
        const message = error?.message
        dispatch(fetchError(message))
      })
  }
}




