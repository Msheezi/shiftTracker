import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'


export const ShiftContext = createContext()

// const fetchShifts = axios.get('/shifts/shifts')

export const ShiftProvider = ({children}) => {
 
    const [data, setData] = useState(null)
    useEffect(  () => {
        
         axios.get('/shifts/shifts').then(res => setData(res.data))
    }, [])

    const {Provider} = ShiftContext 
    return (
        <Provider value={data}>
            {children}
        </Provider>
    )
}


// export const ShiftProvider 
// export const ShiftConsumer 
