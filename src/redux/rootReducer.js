import { combineReducers } from "redux"
import cakeReducer from "./cakes/cakeReducer"
import creamReducer from "./icecream/creamReducer"

const rootReducer = combineReducers({ cake: cakeReducer, cream: creamReducer })

export default rootReducer
