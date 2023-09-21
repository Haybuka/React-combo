## Redux toolkit

- Redux toolkit is opinionated about structure

  - Features folder
  - app folder
  - name files with Slice - cakeSlice.js

* Import required modules

```
const createSlice = require("@reduxjs/toolkit").createSlice;

```

- declare initialState

```
  const initialState = {
  numOfCakes: 10
  }
```

- createSlice

```
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload
    }
  }
})
```

- export slice reducers && actions

```

modules.exports = cakeSlice.reducer
modules.exports.cakeActions = cakeSlice.actions

```

- define and work on store

```

const { configureStore } = require("@reduxjs/toolkit");

// import reducer
const cakeReducer = require("../features/cake/cakeSlice")

const store = configureStore({
  reducer: {
    cake: cakeReducer
  }
})

module.exports = store;
```
