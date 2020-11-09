import {
    actionsTypes
} from './constants';
import { act } from 'react-dom/test-utils';


function dispatchRideReducer(state={}, action) {
    const {
        DISPATCH_RIDE_SUCCESS,
        DISPATCH_RIDE,
        DISPATCH_RIDE_FAILURE,
        RESET_DISPATCH_RIDE
    } = actionsTypes();

    switch(action.type) {

        case DISPATCH_RIDE:
            return {
                ...state,
                ...action.payload,
                errorMessage: '',
                isRideCreated: false,
                isapiActive: true 
            }
        case DISPATCH_RIDE_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isapiActive: false,
                isRideCreated: true
            }
        case DISPATCH_RIDE_FAILURE:
            return {
                ...state,
                ...action.payload,
                isapiActive: false,
                isRideCreated: false
            }
        case RESET_DISPATCH_RIDE:
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
    dispatchRideReducer
};