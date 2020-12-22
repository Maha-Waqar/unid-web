import { actionsTypes } from './constants';
import axios from 'axios';
import {
    actionsTypes as dispatchActions,
    fetchRideDetails
} from '../dispatchRide'
import {
    isActiveRide
} from '../../utils/isActiveRide';

import isEmpty from 'lodash/isEmpty';

const { DISPATCH_RIDE_SUCCESS } = dispatchActions();

export function resetRide() {
    const { RESET_RIDES_LIST } = actionsTypes();
    return {
        type: RESET_RIDES_LIST
    }
}
export function fetchRidesList(payload={}) {
    const {
        FETCH_RIDES_LIST_SUCCESS,
        FETCH_RIDES_LIST_FAILURE
    } = actionsTypes();
    return (dispatch, getState) => {
        const { dispatchRideDetails } = getState();
        const { appState } = getState();
        axios.get(
            'https://unidtest.com.my/apis/riders_get',
            { 
                params: {
                    rider_id: appState && appState.userData && appState.userData.id 
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        ).then((res) => {
            if(res.data.status === 1) {
                dispatch({
                    type: FETCH_RIDES_LIST_SUCCESS,
                    payload: res.data.data
                })

                const currentRide = res.data.data[0];        
                let activeStatus = ["6", "1", "3", "9"];

                if (
                    (currentRide && isActiveRide(currentRide) && currentRide.status === "0") ||
                    isEmpty(dispatchRideDetails) && activeStatus.includes(currentRide.status)
                ) {
                    fetchRideDetails(dispatch,currentRide.rider_id, DISPATCH_RIDE_SUCCESS)
                }
            } else {
                dispatch({
                    type: FETCH_RIDES_LIST_FAILURE,
                    payload: res.data.message
                })
            }
        }).catch((error) => {
          console.log("*************** ", error);            
        });
    }
}