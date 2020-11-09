import {
    actionTypes,
    staticActions
} from './constants'


function SearchRidesReducer(state={isApiActive:false, data:[]}, action) {
    const {
        FETCH_SUGGESTED_RIDES,
        FETCH_SUGGESTED_RIDES_SUCCESS,
        FETCH_SUGGESTED_RIDES_ERROR
    } = actionTypes(action.id)
    switch(action.type) {
        case FETCH_SUGGESTED_RIDES_SUCCESS:
            return {
                isApiActive: false,
                data: action.payload,
            }
        case FETCH_SUGGESTED_RIDES_ERROR:
            return {
                isApiActive:false,                
                data:[]
            }
        case FETCH_SUGGESTED_RIDES:
            return {
                isApiActive:true,
                data: []
            };
        default: 
            return state;
    }
}


function selectedRideDetails(state={}, action) {
    switch(action.type) {
        case staticActions.UPDATE_SUGGESTED_RIDE:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return {
                ...state
            }
    }
};

export {
    SearchRidesReducer,
    selectedRideDetails
}
