import { BUY_CAKE } from "./cakeTypes";
import initialState from "./state";

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload
      }

    default:
      return state
  }
}

export default cakeReducer