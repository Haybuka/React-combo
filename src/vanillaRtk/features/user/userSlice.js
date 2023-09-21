const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const { default: axios } = require("axios")


const initialState = {
  loading: false,
  users: [],
  error: ""
}

// createAsyncThunk generates pending,fulfilled or rejected action types based on promise returned 
// and they can be listened to. in other to perform actions.

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios.get("https://jsonplaceholder.typicode.com/userss/")
    .then((response) => response?.data.map((data) => data.id))
})

const userSlice = createSlice({
  name: "user",
  initialState,
  // using builders we add cases for each of the promise life cycle methods returned from fetchUsers.
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false,
        state.users = action.payload,
        state.error = ""
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false,
        state.users = [],
        state.error = action.error.message
    })
  }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers