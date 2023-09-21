import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: ""
}


// createAsyncThunk generates pending,fulfilled or rejected action types based on promise returned 
// and they can be listened to. in other to perform actions.

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {

  return axios.get("https://jsonplaceholder.typicode.com/users/")
    .then(response => response?.data)

})
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // using builders we add cases for each of the promise life cycle methods returned from fetchUsers.
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ""
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer;