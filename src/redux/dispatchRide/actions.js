import { actionsTypes } from './constants';
import axios from 'axios';
import dummyDispatch from './dummyDispatch.json';
import qs from 'querystring';
import moment from 'moment';
import { isActiveRide } from '../../utils/isActiveRide';
import {
    toast
} from 'react-toastify';
export function resetRide() {
    const { RESET_DISPATCH_RIDE } = actionsTypes();
    return {
        type: RESET_DISPATCH_RIDE
    }
}

export function dispatchRide(payload={}) {
    const {
        DISPATCH_RIDE,
        DISPATCH_RIDE_SUCCESS,
        DISPATCH_RIDE_FAILURE
    } = actionsTypes();

    return (dispatch, getState) => {
        const { dispatchRideDetails } = getState();
        const clonePayload = JSON.parse(JSON.stringify(payload));
        delete clonePayload.name;
        delete clonePayload.price;
        delete clonePayload.isSelected;
        delete clonePayload.image;
        delete clonePayload.seat_number;
        
        clonePayload.driver_id = '1155';
        clonePayload.ride_time = 'now';
        clonePayload.riding_time = moment().add(1,'minute').format("hh:mm");

        dispatch({
            type: DISPATCH_RIDE,
            payload: {
                isdispatchApiRideActive: true
            }
        });

        axios.post(
            'http://220.158.200.73/unid_corp/apis/dispatches',
            qs.stringify(clonePayload),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*",
                }
            }
        ).then((res) => {
            if ( res.data.status === 1 && res.data.data) {
                dispatch({
                    type: DISPATCH_RIDE_SUCCESS,
                    payload: {
                        ...res.data.data,
                        isdispatchApiRideActive: false                
                    }
                });

                toast.success("Ride Created SuccessFully", {
                    position: "bottom-center",
                    autoClose: true
                });
    
                fetchRideDetails(dispatch, clonePayload.rider_id, DISPATCH_RIDE_SUCCESS, res.data.data);
            } else {
                if(res.data.status===1) {
                    toast.error(res.data.message, {
                        position: "bottom-center",
                        autoClose: true,
                        isdispatchApiRideActive:false
                    });
                    dispatch({
                        type: DISPATCH_RIDE_FAILURE,
                        payload: {
                            ...res.data.data,
                            errorMessage: res.data.message,
                            status: '',
                            isdispatchApiRideActive: false
                        }
                    })
                    return;   
                } 
                toast.error(res.data.message, {
                    position: "bottom-center",
                    autoClose: true
                });
                if (res.data.data) {
                    dispatch({
                        type: DISPATCH_RIDE_FAILURE,
                        payload: {
                            ...res.data.data,
                            errorMessage: res.data.message,
                            status: '',
                            isdispatchApiRideActive: false
                        }
                    });
                } else {
                    dispatch({
                        type: DISPATCH_RIDE_FAILURE,
                        payload: {
                            errorMessage: res.data.message,
                            isdispatchApiRideActive: false,
                            
                        }
                    })
                }
            }
        }).catch((error) => {
          console.log("*************** ", error);            
        });
    }
}

export const fetchRideDetails  =  async(dispatch, rider_id, DISPATCH_RIDE_SUCCESS,activeRide) => {
    const pollRideDetatails = setInterval(()=> {
        
        axios.get(
            'http://220.158.200.73/unid_corp/apis/riders_get',
            {
                params: {
                  rider_id
                }
            }
        ).then((res) => { 
            if(res.data.status === 1) {
                let currentRide;

                if (activeRide)
                    currentRide = res.data.data.find((rD)=> {
                        return rD.id === activeRide.id
                    });
                else
                   currentRide = res.data.data[0];
                    
                if ( currentRide && !isActiveRide(currentRide) && currentRide.status === "0") {
                    currentRide.status = "5";
                    dispatch({
                        type: DISPATCH_RIDE_SUCCESS,
                        payload: currentRide
                     });
                    clearInterval(pollRideDetatails);
                    return;
                }
                
                // ride got completed

                if (currentRide && currentRide.status === "4") {
                    dispatch({
                        type: DISPATCH_RIDE_SUCCESS,
                        payload: currentRide
                     });                    
                    clearInterval(pollRideDetatails);
                    return;    
                }

                if (currentRide) {
                    if (
                        (
                          navigator.geolocation &&  window.location.protocol === 'https:' 
                        )
                    )   {
                        navigator.geolocation.getCurrentPosition(function(position) {
                          var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                          };
                          currentRide.rideLocation = pos;
                          dispatch({
                            type: DISPATCH_RIDE_SUCCESS,
                            payload: currentRide
                         });

                        });
                    } else {
                        dispatch({
                            type: DISPATCH_RIDE_SUCCESS,
                            payload: currentRide
                        });
                    }
                }
            }
        }).catch((error) => {
            console.log("*************** ", error);            
        });
    },5000);
}