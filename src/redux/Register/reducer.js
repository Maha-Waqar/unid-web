import {
    actionsTypes
} from './constants';

function registerReducer(state={isApiActive: false}, action) {
    const { USER_REGISTER_API, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } = actionsTypes(action.id);
    switch(action.type) {
        case USER_REGISTER_API:
            return {
                ...state,
                isApiActive: true,
                successLogin: null,
                errormessage: ''
            };
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isApiActive: false,
                ...action.payload,
                successLogin: true
            }
        case USER_REGISTER_FAILURE: {
            return {
                ...state,
                isApiActive: false,
                successLogin: false,
                errormessage: action.payload
            }
        }
        default: 
          return state
    }
}

export {
 registerReducer
}

