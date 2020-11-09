const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
 
const reduxThunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }
    return next(action);
}

window.reduxThunk = reduxThunk;
const middlewares = [logger, reduxThunk];

export { middlewares };

