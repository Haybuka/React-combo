const { Immer, produce } = require("immer");
const redux = require("redux");
const { default: logger } = require("redux-logger");


const initialState = {
  name: "Ndulue Paschal",
  number: '08177449353',
  address: {
    street: "20, Adekitan street",
    city: "Mushin",
    state: "Lagos"
  }
}

const UPDATE_ADDRESS = "UPDATE_ADDRESS";

const updateAddress = (street) => {
  return {
    type: UPDATE_ADDRESS,
    payload: street
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload
      //   }
      // }
      return produce(state, (draft) => {
        draft.address.street = action.payload
      })
    default:
      return state
  }
}

const store = redux.createStore(reducer, redux.applyMiddleware(logger));
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(updateAddress("new street"))
