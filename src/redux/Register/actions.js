import { actionsTypes } from './constants';
import axios from 'axios';

export function resetErrorMessage(id) {
    const { RESET_ERROR_MESSAGE } = actionsTypes(id);
    return {
        type: RESET_ERROR_MESSAGE        
    }
}
export function userRegister(payload={}, id) {
    const { USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_API } = actionsTypes(id);
    var bodyFormData = new FormData();
    Object.entries(payload).forEach(([key, value])=>{
        bodyFormData.set(key, value);
    });
    return (dispatch, getState) => {
        dispatch({
            type: USER_REGISTER_API,
            id
        })
        axios({
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            url: 'https://unidtest.com.my/apis/passenger_register',
            data: bodyFormData
        }).then((res) => {
          if (res.status === 200 && res.data && res.data.status === 1) {
                localStorage.setItem('userSessionData', JSON.stringify(res.data.data));

                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: res.data.data,
                    id
                });
          } else {
            dispatch({
                type: USER_REGISTER_FAILURE,
                payload: res.data.message,
                id
            });
          }
        }).catch((error) => {
            dispatch({
                type: USER_REGISTER_FAILURE,
                payload: error,
                id
            })
        });
    }
}


