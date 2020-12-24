import axios from 'axios'


export const frontEndFetch = (state) => {
    
    return Object.keys(state).map(key => (state[key]))
}

export const keyShifts = (shiftArray) => {
    const shifts = {}
    shiftArray.forEach(shiftObj => {
        shifts[shiftObj._id] = shiftObj
    })
    return shifts
}

export const converDateString = (dateString, time=false) => {
    if(!dateString){
        return ""
    }
  let [month, date, year] = new Date(dateString)
    .toLocaleDateString()
    .split("/");
  let [hour, minute] = new Date(dateString)
    .toLocaleTimeString()
    .slice(0, 7)
    .split(":");
    if (!time){
        return `${month}/${date}/${year} ${hour}:${minute}`;

    } else {
        return `${month}/${date}/${year}`
    }
};

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

export const searchResults = (start, end)=> {
    return axios.get(`shifts/search?start=${start}&end=${end}`)
}