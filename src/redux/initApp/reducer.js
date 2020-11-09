import {
    actionsTypes
} from './constants';


function carListReducer(state=[], action) {
    const {
        FETCH_CAR_TYPE_LIST_SUCCESS
    } = actionsTypes();
    switch(action.type) {
        case FETCH_CAR_TYPE_LIST_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}

export {
    carListReducer
};