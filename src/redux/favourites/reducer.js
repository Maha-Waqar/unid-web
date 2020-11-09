import {
    actionsTypes
} from './constants';

function getFavouriteDriversReducer(
    state = {
        isApiActive: false,
        data:[] 
    },
    action
) {
    const { GET_FAVOURITE_DRIVER, GET_FAVOURITE_DRIVER_SUCCESS, GET_FAVOURITE_DRIVER_FAILURE } = actionsTypes(action.id);
    switch(action.type) {
        case GET_FAVOURITE_DRIVER:
            return {
                ...state,
                isApiActive: true,
                successLogin: null,
                data: [],
                errormessage: ''
            };
        case GET_FAVOURITE_DRIVER_SUCCESS:
            return {
                ...state,
                isApiActive: false,
                data:[...action.payload],
                successLogin: true
            }
        case GET_FAVOURITE_DRIVER_FAILURE: {
            return {
                ...state,
                isApiActive: false,
                successLogin: false,
                data:[],
                errormessage: action.payload
            }
        }
        default: 
          return state
    }
}

export {
    getFavouriteDriversReducer
}

