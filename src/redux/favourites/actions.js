import { actionsTypes } from './constants';
import axios from 'axios';

export function resetErrorMessage(id) {
    const { RESET_ERROR_MESSAGE } = actionsTypes(id);
    return {
        type: RESET_ERROR_MESSAGE        
    }
}

export function getFavouriteDrivers(payload={}, id) {
    const { GET_FAVOURITE_DRIVER, GET_FAVOURITE_DRIVER_FAILURE, GET_FAVOURITE_DRIVER_SUCCESS } = actionsTypes(id);
    return (dispatch, getState) => {
        const {appState ={}} = getState();

        axios.get('https://unidtest.com.my/apis/favorite_get', {
            params: {
              ID: appState.userData && appState.userData.id
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }).then((res) => {
          if (res.status === 200 && res.data) {
                if(res.data.status === 1) {
                    dispatch({
                        type: GET_FAVOURITE_DRIVER_SUCCESS,
                        payload: res.data.data,
                        id
                    });    
                } else {
                    dispatch({
                        type: GET_FAVOURITE_DRIVER_SUCCESS,
                        payload: [],
                        id
                    });    
                }
          } else {
            dispatch({
                type: GET_FAVOURITE_DRIVER_FAILURE,
                payload: res.data.message,
                id
            });
          }
        }).catch((error) => {
            dispatch({
                type: GET_FAVOURITE_DRIVER_FAILURE,
                payload: error,
                id
            })
        });
    }
}

export function addFavourite(payload={}, id) {
    const {
        ADD_FAVOURITE_DRIVER,
        ADD_FAVOURITE_DRIVER_FAILURE,
        ADD_FAVOURITE_DRIVER_SUCCESS,
    } = actionsTypes(id);

    const bodyFormData = new FormData();
    bodyFormData.set('driver_id', payload.driverId);
    
    return (dispatch, getState) => {
        const { appState = {} } = getState();
        bodyFormData.set('user_id', appState.userData && appState.userData.id);

        axios(
            {
                method: 'post',
                url: 'http://220.158.200.73/tbs/apis/favorite',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                data: bodyFormData
            }
        ).then((res) => {
          if (res.status === 200 && res.data) {
                if(res.data.status === 1) {
                    dispatch({
                        type: ADD_FAVOURITE_DRIVER_SUCCESS,
                        payload: res.data.data,
                        id
                    });    
                } else {
                    dispatch({
                        type: ADD_FAVOURITE_DRIVER_SUCCESS,
                        payload: [],
                        id
                    });    
                }
          } else {
            dispatch({
                type: ADD_FAVOURITE_DRIVER_FAILURE,
                payload: res.data.message,
                id
            });
          }
        }).catch((error) => {
            dispatch({
                type: ADD_FAVOURITE_DRIVER_FAILURE,
                payload: error,
                id
            })
        });
    }
}


export function deleteFavourite(payload={}, id) {
    const {
        DELETE_FAVOURITE_DRIVER,
        DELETE_FAVOURITE_DRIVER_SUCCESS,
        DELETE_FAVOURITE_DRIVER_FAILURE,
    } = actionsTypes(id);

    const bodyFormData = new FormData();
    bodyFormData.set('driver_id', payload.driverId);
    bodyFormData.set('user_id', payload.userId);

    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: 'http://220.158.200.73/tbs/apis/favorite_delete',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            data: bodyFormData
        }).then((res) => {
          if (res.status === 200 && res.data) {
                if(res.data.status === 1) {
                    dispatch({
                        type: DELETE_FAVOURITE_DRIVER_SUCCESS,
                        payload: res.data.data,
                        id
                    });    
                } else {
                    dispatch({
                        type: DELETE_FAVOURITE_DRIVER_SUCCESS,
                        payload: [],
                        id
                    });    
                }
          } else {
            dispatch({
                type: DELETE_FAVOURITE_DRIVER_FAILURE,
                payload: res.data.message,
                id
            });
          }
        }).catch((error) => {
            dispatch({
                type: DELETE_FAVOURITE_DRIVER_FAILURE,
                payload: error,
                id
            })
        });
    }
}

