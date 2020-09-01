import React from 'react'

export const Store = React.createContext()

const initialState = {
    shifts: {}
}

const reducer = (state, action) => {
    let newState
    switch (action.type){
        case "fetch":
           newState ={}
           action.payload.forEach(shift => (newState[shift._id] = shift))
           return Object.assign({}, newState)
            
        case "new":
            newState = {...state}
            newState[action.payload._id] = action.payload
           
            return newState
        case "update":
            /* since state is an array of objects
                Using splice to preserve the display order of the shifts in app
            1. duplicate the array
            2. find the index of the item you want to updated
            3. delete the existing element and add the updated element
            4. return the new state
            */
            newState = {...state}
            newState[action.payload._id] = action.payload
            return newState
            //  newState = {...state}
            // let index = newState.shifts.findIndex(shiftObjs => shiftObjs._id === action.payload._id)
            // newState.shifts.splice(index, 1, action.payload)
            // return newState
        default:
            return state
    }
}

export function StoreProvider(props){
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}