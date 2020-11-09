import { actionsTypes } from './constants';
import axios from 'axios';

export function userLogout(id) {
    const { USER_LOGOUT } = actionsTypes(id);
    return {
        type: USER_LOGOUT
    }
}

export function userSuccessLogin(payload,id) {
   const {USER_LOGIN_SUCCESS} = actionsTypes(id)
    return ({
        type: USER_LOGIN_SUCCESS,
        payload,
        id
    });
}

export function userLogin(payload={}, id) {
    const { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_API } = actionsTypes(id);
    var bodyFormData = new FormData();
    bodyFormData.set('username', payload.username);
    bodyFormData.set('password', payload.password);
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGIN_API,
            id
        })
        axios({
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            url: 'http://220.158.200.73/unid_corp/apis/passenger_login',
            data: bodyFormData
        }).then((res) => {
          if (res.status === 200 && res.data.message === "Login Successfully!") {
                localStorage.setItem('userSessionData', JSON.stringify(res.data.data));
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: res.data.data,
                    id
                });
          }
          if(res.data.status === 0) {
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: res.data.message,
                id
            })
          }
        }).catch((error) => {
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: error,
                id
            })
        });
    }
}


