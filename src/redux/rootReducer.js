import { combineReducers } from "redux"
import cakeReducer from "./cakes/cakeReducer"
import creamReducer from "./icecream/creamReducer"
import userReducer from "./user/apiReducer"

const rootReducer = combineReducers({ cake: cakeReducer, cream: creamReducer, user: userReducer })

export default rootReducer
