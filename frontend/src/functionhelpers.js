import axios from 'axios'


export const frontEndFetch = (state) => {
    
    return Object.keys(state).map(key => (state[key]))
}


export const getShiftAPI = (shiftId) => {
    return ( axios.get(`/shifts/${shiftId}`))
            
}

export const postShiftAPI = (shiftId, shift) => {
    return (axios.patch(`/shifts/${shiftId}`, shift))
}

export const closeShiftAPI = (shiftId, shift) => {
    return (axios.patch(`/shifts/close/${shiftId}`, shift))
}

export const fetchShiftsAPI = () => {
    return axios.get("/shifts/shifts")
}

export const addNewShiftAPI = () => {
    return axios.post("shifts/newshift")
}

export const uploadPhoto = (pictureObj) => {
    return axios.post("/pictures/upload", pictureObj)
}