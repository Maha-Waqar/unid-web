import { actionsTypes } from './constants';
import axios from 'axios';

export function carTypeList(payload={}) {
    const {
        FETCH_CAR_TYPE_LIST_SUCCESS,
        FETCH_CAR_TYPE_LIST_FAILURE 
    } = actionsTypes();
    return (dispatch, getState) => {
        axios({
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            url: 'https://unidtest.com.my/apis/car_type',
        }).then((res) => {
          if (res.status === 200) {
                dispatch({
                    type: FETCH_CAR_TYPE_LIST_SUCCESS,
                    payload: res.data.message,
                });
          }
        }).catch((error) => {
            console.log("Error", error);
            dispatch({
                type: FETCH_CAR_TYPE_LIST_FAILURE,
                payload: error,
            })
        });
    }
}