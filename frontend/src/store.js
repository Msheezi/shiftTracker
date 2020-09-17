import React from 'react'

export const Store = React.createContext()

const initialState = {
    shifts: {}
}

const reducer = (state, action) => {
    let newState
    switch (action.type) {
      case "fetch":
        newState = {};

        action.payload.forEach((shift) => (newState[shift._id] = shift));

        return { shifts: newState };

      case "new":
        newState = { ...state };
        newState.shifts[action.payload._id] = action.payload;

        return newState;
      case "update":
        newState = { ...state };
        newState.shifts[action.payload._id] = action.payload;
        return newState;

      case "upload":
        const { _id } = action.payload;
        newState = { ...state };
        newState.shifts = { ...state.shifts };
        newState.shifts[_id] = action.payload;
        return newState;

      default:
        return state;
    }
}
/*below is mostly boilerplate that creates top level state with the 
use reducer call
then assigns the state object and the dispatch updated function to the provider
prop value
finally return a component with the value prop with keys for the state and the 
means to update it.  
pass props.children to make values available to nested components

*/
export function StoreProvider(props){
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}