import React from 'react'

export const Store = React.createContext()

const initialState = {
    shifts: {}
}

const reducer = (state, action) => {
    let newState
    switch (action.type){
        case "fetch":
           newState = {}

           action.payload.forEach(shift => (newState[shift._id] = shift))
           
            return { shifts: newState}
            
        case "new":
            newState = {...state}
            newState[action.payload._id] = action.payload
           
            return { shifts: newState }
        case "update":
         
            newState = {...state}
            newState[action.payload._id] = action.payload
            return { shifts: newState }
           
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}