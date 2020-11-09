import {
    actionsTypes
} from './constants';

let userSession = localStorage.getItem('userSessionData') || {};
userSession = typeof(userSession) === "string" ? JSON.parse(userSession) : {} ;

const initState = {
    isApiActive: false,
    ...userSession
}

function loginReducer(state=initState, action) {
    const { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_API } = actionsTypes(action.id);
    console.log(action.type);
    switch(action.type) {
        case USER_LOGIN_API:
            return {
                ...state,
                isApiActive: true
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isApiActive: false,
                ...action.payload
            }
        case USER_LOGIN_FAILURE: {
            return {
                ...state,
                isApiActive: false,
            }
        }
        default: 
          return state
    }
}

export default {
    userData: loginReducer
}

