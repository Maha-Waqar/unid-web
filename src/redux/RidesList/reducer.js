import {
    actionsTypes
} from './constants';


function fetchRidesListReducer(state={}, action) {
    const {
        FETCH_RIDES_LIST,
        FETCH_RIDES_LIST_SUCCESS,
        FETCH_RIDES_LIST_FAILURE,
        RESET_RIDES_LIST
    } = actionsTypes();

    switch(action.type) {

        case FETCH_RIDES_LIST:
            return {
                data:[],
                errorMessage: '',
                isRideCreated: false,
                isapiActive: true 
            }
        case FETCH_RIDES_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isapiActive: false,
                isRideCreated: true,
            }
        case FETCH_RIDES_LIST_FAILURE:
            return {
                data: [],
                ...state,
                isapiActive: false,
                isRideCreated: false,
                errorMessage: action.payload
            }
        case RESET_RIDES_LIST:
            return {
                ...state,
                isRideCreated: false,
                errorMessage: ''
            }
        default: 
            return state;
            
    }
}

export {
    fetchRidesListReducer
};