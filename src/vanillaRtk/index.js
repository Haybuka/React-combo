const store = require("./app/store")
const { creamActions } = require("./features/cream/creamSlice")
const { cakeActions } = require("./features/cake/cakeSlice")
const { fetchUsers } = require("./features/user/userSlice")


console.log("initial state", store.getState())
const unsubscribe = store.subscribe(() => { })
// const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()))

store.dispatch(fetchUsers())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(2))
// store.dispatch(creamActions.ordered())

// store.dispatch(creamActions.restocked(2))
// store.dispatch(creamActions.restocked(2))