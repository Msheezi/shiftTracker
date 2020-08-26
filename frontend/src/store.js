import React from 'react'

export const Store = React.createContext()

const initialState = {
    shifts: []
}

const reducer = (state, action) => {
    let newState
    switch (action.type){
        case "fetch":
            return {...state, shifts: action.payload}
        // newState = {...state}
        // newState.shifts.push(action.payload)
        // console.log(state)
        // return newState
        case "new":
            newState = {...state}
            newState.shifts.push(action.payload)
            return newState
    }
}

export function StoreProvider(props){
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}