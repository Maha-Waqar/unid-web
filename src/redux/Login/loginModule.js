import { loginReducer } from './reducer';

export default function loginModule () {
    return {
        id: "loginModule",
        // Maps the Store key to the reducer
        reducerMap: {
            loginState: loginReducer,
        }        
    }   
}