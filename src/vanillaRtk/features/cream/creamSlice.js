const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfCream: 20
}

const creamSlice = createSlice({
  name: "cream",
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numOfCream--
    },
    restocked: (state, action) => {
      state.numOfCream += action.payload
    }
  },
  // Use extra reducer to trigger a reducer that you want to be shared.
  // it allows createSlice to respond to other action types asides the types it has generated.
  // this reducer listens for the action "cake/ordered", and uses that to act on it.

  // This can be done in 2 methods - object call as below, or using a builder (after object call)

  // extraReducers: {
  //   ["cake/ordered"]: (state, action) => {
  //     state.numOfCream--
  //   }
  // }

  // Builder method
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state, action) => {
      state.numOfCream--
    })
  }
})


module.exports = creamSlice.reducer
module.exports.creamActions = creamSlice.actions