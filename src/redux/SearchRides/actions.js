import {
    actionTypes
} from './constants';
import axios from 'axios';
import { actionsTypes } from '../Login/constants';

export function searchRides(apiPayload, id) {
    const {
        FETCH_SUGGESTED_RIDES,
        FETCH_SUGGESTED_RIDES_ERROR,
        FETCH_SUGGESTED_RIDES_SUCCESS
    } = actionTypes(id);
    return ((dispatch, getState) => {
        dispatch({
            type: FETCH_SUGGESTED_RIDES,
            id
        });
        const bodyFormData= new FormData();
        Object.entries(apiPayload).forEach(([key,value]) => {
            bodyFormData.set(key, value);
        });
        axios({
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            url: 'https://unidtest.com.my/apis/ride_fare',
            data: bodyFormData
        }).then((res) => {
          if (res.status === 200 && res.data.priceData) {
                dispatch({
                    type: FETCH_SUGGESTED_RIDES_SUCCESS,
                    payload: res.data.priceData,
                    id
                });
          }
        }).catch((error) => {
            dispatch({
                type: FETCH_SUGGESTED_RIDES_ERROR,
                payload: error,
                id
            })
        });
    })
}
