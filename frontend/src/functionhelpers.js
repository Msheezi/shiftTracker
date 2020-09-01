export const frontEndFetch = (state) => {
    
    return Object.keys(state).map(key => (state[key]))
}