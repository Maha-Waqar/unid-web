import React, { Component, useState, useEffect } from 'react';
import {
  Send,
  KeyboardBackspace,
} from '@material-ui/icons'
import {
  Avatar, Grid, Button, Typography,Dialog, DialogTitle
} from '@material-ui/core';
import * as qs from 'query-string';
import './home.css';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../../components/Sidebar';
import ReactGoogleMaps from '../../components/ReactGoogleMaps';
import { Link, useHistory, useLocation } from 'react-router-dom';

import FromToCard from '../../components/FromToCard';
import MapWithASearchBox from '../../components/SearchGoogleMaps';
import SuggestedRides from '../../components/common/SuggestedRides';
import { isActiveRide } from '../../utils/isActiveRide';
import Loading from '../../components/common/Loading';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import RatingCard from '../../components/RatingCard';
import axios from 'axios';

import {
  userLogout
} from '../../redux/Login'
import {
  fetchRidesList
} from '../../redux/RidesList'
import {
  searchRides
} from '../../redux/SearchRides';
import {
  dispatchRide,
  resetRide,
  fetchRideDetails,
  actionsTypes
} from '../../redux/dispatchRide';

import {
  connect
} from 'react-redux';
import { DirectionsRenderer } from 'react-google-maps';

import { isEmpty } from 'lodash';

const ListofView = {
   "home": "home",
   "showpickupdropoff": "showpickupdropoff",
   "editLocation": "editLocation",
   "suggestionRidesList": "suggestionRidesList",
   "confirmation": "confirmation",
   "paymentMethods": "paymentMethods",
   "favouriteDriver":  "favouriteDriver",
   "promocode": "promocode",
   "notes": "notes",
}

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

let fromSuggestionsCard = false;

const Home = (props) => {
  const history = useHistory();
  const location = useLocation();
  const resumeRide = location.state ? location.state.initRide : null;
  const [directionsServiceResponse, setDirectionsServiceResponse]= useState(null)
  const [left, setLeft] = useState(false);
  const [fareRideApiRequestDetails, setFareRideApiRequestDetails] = useState({});
  const [viewType, setViewType] = useState(resumeRide ? ListofView.suggestionRidesList: ListofView.home);
  const [currentView, setCurrentView] = useState('');
  const [pickupCoor, setPickupCoor] = useState({});
  const [dropoffCoor, setDropoffCoor] = useState({});

  let distance;
  let duration;

  useEffect(() => {
    if(ListofView.showpickupdropoff === viewType && navigator.geolocation) {
      if (!isEmpty(pickupCoor) && !isEmpty(dropoffCoor)) {
        suggestedRidesEventHandler();
      }
    }
  },[viewType]);

  useEffect(() => {
    const parsed = qs.parse(location.search);
    if (parsed.token) {
      axios.post(`https://unidtest.com.my/apis/verify_token?token=${parsed.token}`).then((res) => {
        if (res.data.status !== "error") {
          localStorage.setItem('userlogintoken',parsed.token);
          history.push('/');
        } else {
          history.push('/login');
        }
      }).catch((error) => {
        console.log("token not matched", error)
      }) 
    }
    props.fetchRidesList();
  },[]);

  useEffect(()=> {
    if (
      (
        navigator.geolocation &&  window.location.protocol === 'https:'
      )
    )
      navigator.geolocation.getCurrentPosition(function(pos) {
        var lat =  pos.coords.latitude;
        var lng = pos.coords.longitude;
        if (window.google) {
          let geocoder = new window.google.maps.Geocoder();
          var latlng = new window.google.maps.LatLng(lat, lng);
          geocoder.geocode({'latLng': latlng}, function(results, status) {
            if(status === window.google.maps.GeocoderStatus.OK) {
              results.length && isEmpty(pickupCoor) && setPickupCoor(results[0]);
            }
          });

        }
      });
  })

  useEffect(() => {
    if (!isEmpty(props.dispatchRideDetails)) {
      if (props.dispatchRideDetails.errorMessage &&  viewType === ListofView.suggestionRidesList) {
        return;
      }      
      let activeRideStatus = ['1', '9', '3' , '6'];
      const latestRide = props.rideHistory.data[0];
      if (
        latestRide &&
        (
          activeRideStatus.includes(latestRide.status)  || 
          (
            latestRide.status === '0'  &&
            isActiveRide(latestRide)
          )
        ) &&
        viewType !== ListofView.suggestionRidesList
      ) {
        latestRide.isRideCreated = true;
        setViewType(ListofView.suggestionRidesList);
        props.fetchRideDetails(latestRide.rider_id, latestRide);
        
        let directionsService = window.google && new window.google.maps.DirectionsService();
        let directionsRenderer = window.google && new window.google.maps.DirectionsRenderer();
        // directionsRenderer.setMap(new window.google.map); 
    
        let pickuplatlng = latestRide.pickup_lat_long && latestRide.pickup_lat_long.split(",");
        let dropofflatlng = latestRide.drop_lat_long && latestRide.drop_lat_long.split(",");
        if(pickuplatlng &&  dropofflatlng) {
          const route = {
            origin:{
              lat: Number(pickuplatlng[0]),
              lng: Number(pickuplatlng[1])
            },
            destination:{
              lat: Number(dropofflatlng[0]),
              lng: Number(dropofflatlng[1])
            },
            travelMode: 'DRIVING',
        }
    
        directionsService && directionsService.route(route,
          function(response, status) { // anonymous function to capture directions
            if (status !== 'OK') {
              window.alert('Directions request failed due to ' + status);
              return;
            } else {
              var directionsData = response.routes[0].legs[0];
              distance = Math.round(directionsData.distance.value/1000);
              const apiRequest = {
                km: distance,
                company_id: latestRide.company_id,
                rider_id: latestRide.rider_idp
              }
              setDirectionsServiceResponse(response);
              props.searchRides(apiRequest, props.id);
            }
          }
        );
        }
      }
    }
         
  }, [props.dispatchRideDetails]);

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setLeft(!left);
  };

  const editLocation = (type, event, currentPage) => {
    if (currentPage) {
      fromSuggestionsCard = true;
    } 
    setViewType(ListofView.editLocation);
    setCurrentView(type);
  }
  
  const suggestedRidesEventHandler = () => {
    const self = this;
    
    var origin = {
      lat: pickupCoor.geometry.location.lat(),
      lng: pickupCoor.geometry.location.lng()
    };

    var destination = {
      lat: dropoffCoor.geometry.location.lat(),
      lng: dropoffCoor.geometry.location.lng()
    };

    let directionsService = new window.google.maps.DirectionsService();
    let directionsRenderer = new window.google.maps.DirectionsRenderer();
    // directionsRenderer.setMap(new window.google.map); 

    const route = {
        origin,
        destination,
        travelMode: 'DRIVING'
    }

    directionsService.route(route,
      function(response, status) { // anonymous function to capture directions
        if (status !== 'OK') {
          window.alert('Directions request failed due to ' + status);
          return;
        } else {
          setDirectionsServiceResponse(response);
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
          if (!directionsData) {
            // window.alert('Directions request failed');
            return;
          }
          else {
            distance = Math.round(directionsData.distance.value/1000);
            duration = directionsData.duration.text;
            const apiRequest = {
              km: distance,
              company_id: props.appState.userData && props.appState.userData.company_id,
              rider_id: props.appState.userData && props.appState.userData.id
            };
            setFareRideApiRequestDetails(apiRequest);
            props.searchRides(apiRequest, props.id);
          }
        }
      });
  }

  const handleSelecetedDropDown = ([placeDetails], selectedmarkers, selectedMapCenter) => {
  
    if (currentView === "pickup") {
      setPickupCoor({
        ...placeDetails ,
        selectedmarkers,
        selectedMapCenter
      });
      return;
    }
  
    setDropoffCoor({
      ...placeDetails ,
      selectedmarkers,
      selectedMapCenter
    });
  }

  const backspaceEventHandler = () => {
    if(fromSuggestionsCard) {
      suggestedRidesEventHandler();
      setViewType(ListofView.suggestionRidesList);
      fromSuggestionsCard = false;
      return;
    }
    setViewType(ListofView.showpickupdropoff);
  }


  if (ListofView.suggestionRidesList === viewType) {
    if(props.dispatchRideDetails && props.dispatchRideDetails.isdispatchApiRideActive) {
      return (
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={true}
          style={{ width: '100%' }}
          classes={{
              paper: 'custom-dialog-pop-up'
          }}
        >
          <DialogTitle id="simple-dialog-title">      
            <Loading />                  
          </DialogTitle>
        </Dialog>
      )
    }
    return (
      <SuggestedRides
        isRideApiActive={props.isRideApiActive}
        resumeRide={resumeRide}
        searchRides={props.searchRidesList}
        data={props.searchRidesList.data}
        userLogout={props.userLogout}
        carList = {props.carList}
        fareRideApiRequestDetails = {fareRideApiRequestDetails}
        setViewType={setViewType}
        pickupCoor={pickupCoor}
        setPickupCoor={setPickupCoor}
        setDropoffCoor={setDropoffCoor}
        dropoffCoor={dropoffCoor}
        setViewType={setViewType}
        directionsServiceResponse={directionsServiceResponse}
        editLocation={editLocation}
        ListofView={ListofView}
        appState={props.appState}
        dispatchRide={props.dispatchRide}
        dispatchRideDetails={ props.dispatchRideDetails}
        resetDispatch={props.resetDispatch}
      />
    ) 
  }

  if (ListofView.editLocation === viewType) {
    return (
      <Grid container style={{position:"relative", flexDirection: 'column', height: "100%"}}>
        <Grid item style={{padding: '10px'}}>
          <Grid container>
            <Grid item>
              <KeyboardBackspace  
                onClick={
                  () => {
                    backspaceEventHandler();
                  }
                }
              />
            </Grid>
            <Grid item style={{marginLeft: '10px'}}>
              <Typography>
                {
                  currentView === "pickup" ?
                    "Select a Pickup Location"
                  :
                    "Select a Destination"
                }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{flexGrow: 1}}>
          <MapWithASearchBox
            handleSelecetedDropDown={handleSelecetedDropDown}
            backspaceEventHandler = {backspaceEventHandler}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtnC40--ks77FHt8xgBuOkR0xePyXbNZ8&libraries=places"
            loadingElement ={<div style={{ height: `100%` }} /> }
            containerElement={<div style={{ height: `100%`}}/> }
            mapElement= {<div style={{ height: `100%` }} /> }
            placeholder = { currentView === "pickup"? "Pickup Location": "Dropoff Location" }
            initCenter = { currentView === "pickup" ? pickupCoor.selectedMapCenter: dropoffCoor.selectedMapCenter }
            initMarkers = { currentView === "pickup" ? pickupCoor.selectedmarkers : dropoffCoor.selectedmarkers }
            initLocation = { currentView === "pickup" ? pickupCoor : dropoffCoor }
            defaultValue = { currentView === "pickup" ?  pickupCoor.name || pickupCoor.formatted_address : dropoffCoor.name }
            currentView ={currentView}
          />
        </Grid>
      </Grid>
    )
  }

  if(!window.disptachRide) {
    window.dispatchRide = props.dispatchRide
  }
  return (
      <>
        <ReactGoogleMaps 
          googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtnC40--ks77FHt8xgBuOkR0xePyXbNZ8&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
          {
            directionsServiceResponse && 
            <DirectionsRenderer
              directions={directionsServiceResponse}
              defaultOptions= {{
                // polylineOptions: {
                //   strokeColor: "yellow"
                // },
                markerOptions: {
                  origin: {
                    infoWindow: 'From',
                    icon: 'data:image/png;base64,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',
                    scaledSize: new window.google.maps.Size(64, 64)
                  },
                  destination: {
                    infoWindow: 'To',
                    icon: 'http://i.imgur.com/7teZKif.png',
                    scaledSize: new window.google.maps.Size(64, 64)
                  },
                }
              }}
            />
          }
        </ReactGoogleMaps>
        <SideBar userLogout={props.userLogout} />
          {
            viewType === ListofView.showpickupdropoff ?
              <div style={{ position:"absolute", bottom: "40px", width: '100%'}}>
                <div style={{ margin: ' 0 auto', width: '90%'}}>
                  <FromToCard
                    fromLocationName = {pickupCoor.name || pickupCoor.formatted_address}
                    toLocationName= {dropoffCoor.name}
                    fromLabel= {'Search for Pickup Location'}
                    toLabel={'Search for Destination'}
                    editLocation={editLocation}
                    footer = {
                      <Button variant="contained" style={{ backgroundColor: "rgb(31, 199, 31)"}} fullWidth
                        disabled={!((pickupCoor.name || pickupCoor.formatted_address) && dropoffCoor.name)}
                        onClick={
                          () => {
                            setViewType(ListofView.suggestionRidesList)
                            // suggestedR?idesEventHandler(); 
                          }
                        }
                      >
                        Search Rides
                      </Button>
                    }
                    isCancel={true}
                    cancelEventHandler={(e) => { 
                      setViewType(ListofView.home)
                      setPickupCoor({});
                      setDropoffCoor({});
                    }}
                  />

                </div>
              </div>
            :
              <div style={{ position:"absolute",  right:"30px", bottom: "40px"}}>
                <Avatar 
                  style={{ backgroundColor: '#17b717', cursor: 'pointer'}}
                  onClick={()=>{
                    setViewType(ListofView.showpickupdropoff)
                  }}
                >
                  <Send  />
                </Avatar>
              </div>
            }
      </> 
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownprops) => {
  const {id="homepage"} = ownprops;
  const {
    DISPATCH_RIDE_SUCCESS
  } = actionsTypes()
  return {
    searchRides: (data) => {
      dispatch(searchRides(data,id));
    },
    dispatchRide:(rideDetails) => {
      dispatch(dispatchRide(rideDetails))
    },
    resetDispatch: () => {
      dispatch(resetRide())
    },
    fetchRidesList: () => {
      dispatch(fetchRidesList())
    },
    userLogout: () => {
      dispatch(userLogout())
    },
    fetchRideDetails: (rider_id, activeRide) => {
      fetchRideDetails(dispatch,rider_id,DISPATCH_RIDE_SUCCESS, activeRide)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
