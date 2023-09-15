
import { BUY_CREAM } from "./creamTypes";
import initialState from "./state";

const creamReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CREAM:
      return {
        ...state,
        numOfCream: state.numOfCream - 1
      }

    default:
      return state
  }
}

export default creamReducer