## Redux ToolKit Setup

- Folder Structure

  - Redux

    - Features

      - Name of Action/ActionCreator : Staffs/User/Login/Activity

    - App

      - Store

## Installation : install needed packages

- npm i axios @reduxjs/toolkit react-redux redux-logger

## set up first slice - userSlice.js (creates an async)

```
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: ""
}


// createAsyncThunk generates pending,fulfilled or rejected action types based on promise returned
// and they can be listened to. in other to perform actions.

const fetchUsers = createAsyncThunk("user/fetchUsers", () => {

  return axios.get("https://jsonplaceholder.typicode.com/usersx/")
    .then(response => response?.data)

})

const userSlice = createSlice({
  name: "users",
  initialState,
  // for async call, returning empty reducer helps with typescript.
  // reducer is empty because async data here is to be handled by extra reducers
  reducers: {},
  extraReducers: (builder) => {
    // using builders we add cases for each of the promise life cycle methods returned from fetchUsers (line 35).
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

```

## Store - Quite explanatory

```
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
import { createLogger } from "redux-logger";

// redux logger to inspect, but you can depent on reduxDevtOOLS
const logger = createLogger()

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store

```

## Bringing it to App / root file..

- Using a Provider, provide the store to all components and use accordingly

## Usage

- create a userView.jsx file and consume using dispatch and selector

```
const UserView = () => {
  const { loading, users, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <section>
      {loading && <p>Loading</p>}
      {loading === false && error && <p>{error}</p>}
      {users.length > 0 && <p>User</p>}
    </section>
  );
};

export default UserView;

```
