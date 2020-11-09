import React, { useRef } from 'react';
import ReactGoogleMaps from '../../components/ReactGoogleMaps';
import FromToCard from '../../components/FromToCard';
import BackButton from '../../components/BackButton';
import LinearProgress from './LinearProgress';
import PhoneIcon from '@material-ui/icons/Phone';
import Payment from '../Payment';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Grid,
    Button,
    ExpansionPanelDetails,
    TextField,
    Dialog,
    List,
    ListItem,
    ListItemAvatar,
    DialogTitle,
    Avatar,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import DateFnsUtils from '@date-io/date-fns';
import {
    toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
 withRouter
} from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import {
    ExpandMore
} from '@material-ui/icons';
import RideOption from './RideOption';
import { useState } from 'react';
import './SuggestedRides.css';
import Loading from './Loading';
import { useEffect } from 'react';
import RideFacilities from '../../components/RideFacilities';
import RatingComponent from './RatingComponent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { DirectionsRenderer, Marker } from 'react-google-maps';
import RatingCard from '../RatingCard';
import Sidebar from '../../components/Sidebar';

toast.configure();

const initRide = {
    company_id:12,
    rider_id: null,
    ride_time: null,
    riding_date: moment().format('DD-MM-YYYY'),
    riding_time: null,
    pickup_location: null,
    drop_location: null,
    pickup_lat_long: null,
    drop_lat_long: null,
    km: '',
    Actual_km: '',
    hours: null,
    country:131,
    payment_method:3,
    coupon:"",
    vehicle_type:"",
    driver_id:"",
    id:"",
    note:"",
    keyword: "",
    redemption_amount:"",
    status:0
}

const SuggestedRides = ({ carList,pickupCoor, dropoffCoor,setDropoffCoor, setPickupCoor ,searchRides={}, ...props }) => {
    const [activeRide,setActiveRide] = useState(props.dispatchRideDetails  || {});
    const [isExpanded, setIsExpanded] = useState(false);
    const [showpopup, setShowpopup] = useState(false);
    const activeRideStatuses = ['1', '0', '9', '3'];
    let prevDispatchRideDetails = useRef(activeRide);
    let updateRide = {
        ...initRide,
        pickup_lat_long: !isEmpty(pickupCoor) ? typeof(pickupCoor) === 'string' ? pickupCoor : `${pickupCoor && pickupCoor.geometry && pickupCoor.geometry.location.lat()},${pickupCoor && pickupCoor.geometry && pickupCoor.geometry.location.lng()}`:activeRide && activeRide.pickup_lat_long ,
        drop_lat_long: !isEmpty(dropoffCoor) ? typeof(dropoffCoor) === 'string' ? dropoffCoor : `${dropoffCoor && dropoffCoor.geometry && dropoffCoor.geometry.location.lat()},${dropoffCoor && dropoffCoor.geometry && dropoffCoor.geometry.location.lng()}`:activeRide && activeRide.drop_lat_long ,
        pickup_location:  !isEmpty(pickupCoor) ? pickupCoor.formatted_address : activeRide.pickup_location ,
        drop_location: !isEmpty(dropoffCoor) ? dropoffCoor.formatted_address : activeRide.drop_location ,
        rider_id: props.appState.userData && props.appState.userData.id,
    }
    if(props.resumeRide) {
        updateRide = props.resumeRide
    }
    
    const [selectedRide, setSelectedRide] = useState(updateRide);
    const [fareList, setFareList] = useState([]);
    const [activeRideFacility, setActiveRideFacility] = useState(null);

    useEffect(() => {
        if(props.dispatchRideDetails.errorMessage) {
            if(showpopup) {
                setShowpopup(false);
                return;
            }
        }
        let activeStatus = ["0","6", "3", "1","4", "9"];
        if (
            props.dispatchRideDetails.status !== prevDispatchRideDetails.current.status 
            && 
            activeStatus.includes(prevDispatchRideDetails.current.status)
        ) {
            setActiveRide(props.dispatchRideDetails);
        }
        if (
            props.dispatchRideDetails.isRideCreated &&
            props.dispatchRideDetails.status === "5" &&
            prevDispatchRideDetails.current.status === "5"
        ) {
            if(showpopup)
                setShowpopup(!showpopup);
        } else {
            if (activeStatus.includes(props.dispatchRideDetails.status)) {
                if(!showpopup) {
                    setShowpopup(!showpopup);
                }
            }    
        }
        prevDispatchRideDetails.current = props.dispatchRideDetails;
    }, [props.dispatchRideDetails]);

    useEffect(() => {
        if (props.resumeRide) {
            setTimeout(() => {
                props.dispatchRide(props.resumeRide);
            },4000)
        }
    },[]);

    useEffect(() => {
        if (props.directionsServiceResponse) {
            var directionsData = props.directionsServiceResponse.routes[0].legs[0]
            setSelectedRide({
                ...selectedRide,
                km: Math.round(directionsData.distance.value/1000),
                hours: directionsData.duration.text
            })
        }
    }, [props.directionsServiceResponse]);

    useEffect(() => {
        let fareList = searchRides.data || [];
           
        fareList = fareList.map((rideFareData) => {
            const carData = Object.values(carList).find((carData) => (carData.id.toString() === rideFareData.carId)) || {}
            return {
                ...rideFareData,
                ...carData
            }
        });

        const carData = Object.values(carList)[0];
        const ride = fareList.find((data) => { return data.carId === carData.id}); 

        if (ride) {
            let updateSelectedRide = {
                ...selectedRide,
                company_id :ride.company_id,
                vehicle_type: ride.carId,
                name:ride.name,
                price: ride.price,
                image: ride.image,
                seat_number: ride.seat_number,
            };
            if (props.directionsServiceResponse) {
                var directionsData = props.directionsServiceResponse.routes[0].legs[0]
                updateSelectedRide = {
                    ...updateSelectedRide,
                    km: Math.round(directionsData.distance.value/1000),
                    hours: directionsData.duration.text
                }
            }
            searchRides.data.length && setSelectedRide(updateSelectedRide);
        }
        searchRides.data.length && setFareList(fareList);
    }, [searchRides]);

    const renderFields = ( currentState, updateFun ) => {
        switch(activeRideFacility) {
            case 'paymentMethods':
                return <Payment  selectedRide={selectedRide} userData={props.appState}/>
            case 'notes':
                return (
                    <Grid container direction="column" style={{padding: '12px'}}>
                        <Grid xs={12} md={12}>
                          <h3>Notes</h3>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <textarea
                                value={currentState.note}
                                onChange={(eve)=>{
                                    updateFun({
                                        ...currentState,
                                        note: eve.target.value
                                    })
                                }}
                            >
                                
                            </textarea>
                        </Grid>
                    </Grid>
                );
            case 'promoCode':
                return (
                    <Grid container direction="column">
                        <Grid xs={12} md={12}>
                          <h3>Promo Code</h3>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <TextField
                                label="Please key in your promo code" 
                                value={currentState.note}
                                onChange={(eve)=>{
                                    updateFun({
                                        ...currentState,
                                        coupon: eve.target.value,
                                    })
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 'rideDate':
                return (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="dd-mm-yyyy"
                            value={moment(currentState.riding_date,'DD-MM-YYYY').toDate()}
                            onChange= {(date) => {
                                updateFun({
                                    ...currentState,
                                    riding_date: moment(date).format('DD-MM-YYYY'),
                                })                            
                            }}
                        />
                    </MuiPickersUtilsProvider>
                )
        }
    }

    if (searchRides.data.length) selectedRide.isSelected = true;
    
    if (activeRideFacility) {
        return (
            <Grid style={{ position: 'relative' }}>
                <div
                    onClick={(e)=>{e.preventDefault(); setActiveRideFacility(null)}}
                >
                <BackButton />
                </div>
                
                {
                    renderFields(selectedRide, setSelectedRide)
                }
            </Grid>
        )
    }

    var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
    var icon = {
        path: car,
        scale: .7,
        strokeColor: 'white',
        strokeWeight: .10,
        fillOpacity: 1,
        fillColor: '#3adf16',
        offset: '5%',
        // rotation: parseInt(heading[i]),
        anchor: window.google && new window.google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
    }


    if (
        activeRide.status === "3"
    ) {
        return (
            <>
                <Sidebar />
                <ReactGoogleMaps 
                    directionsServiceRes = {props.directionsServiceResponse}
                    googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBprptSdG-fBX56k_nWnUl-HugtF8pFcQA&libraries=places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    centerPos={{
                        lat: 17.4500175,
                        lng: 78.3826013
                    }}
                >
                    {
                        props.directionsServiceResponse &&
                        <>
                            <DirectionsRenderer
                                directions={props.directionsServiceResponse}
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
                            <Marker
                                icon={icon}
                                draggable
                                position={activeRide.rideLocation}
                            />
                        </>
                    }
                </ReactGoogleMaps>       
            </>
        )
    }


    return (
        <>
            <Sidebar userLogout={props.userLogout}/>
            <ReactGoogleMaps
                directionsServiceRes = {props.directionsServiceResponse}
                googleMapURL= "https://maps.googleapis.com/maps/api/js?key=AIzaSyBprptSdG-fBX56k_nWnUl-HugtF8pFcQA&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}      
            >
                {
                    props.directionsServiceResponse &&
                    <DirectionsRenderer directions={props.directionsServiceResponse} />
                }
            </ReactGoogleMaps>

            <div style={{ position:"absolute", top: "40px", width: '100%'}}>
            <div style={{ margin: ' 0 auto', width: '90%'}}>
                <FromToCard
                fromLocationName = {updateRide.pickup_location}
                toLocationName= {updateRide.drop_location}
                fromLabel= {'Search for Pickup Location'}
                toLabel={'Search for Destination'}
                editLocation={(type,e) => { 
                    if (type==="pickup") {
                        let overRideActiveRide =  {...activeRide};
                        delete overRideActiveRide.pickup_location;
                        delete overRideActiveRide.pickup_lat_long;
                        setActiveRide({
                            ...activeRide,
                        });
                    } else {
                        let overRideActiveRide =  {...activeRide};
                        delete overRideActiveRide.drop_location;
                        delete overRideActiveRide.drop_lat_long;
                        setActiveRide({
                            ...activeRide,
                        });
                    };
                    props.editLocation(type,e,"suggestedRides");
                }}
                isCancel={false}
                cancelEventHandler={(e) => { 
                    props.setViewType(props.ListofView.home)
                    props.setPickupCoor({});
                    props.setDropoffCoor({});
                }}
                footer={<div></div>}
                />
            </div>
            </div>
            <div style={{ position:"absolute", bottom: "40px", width: '100%'}}>
          <div style={{ margin: ' 0 auto', width: '90%'}}>
            
            <div className="suggested-ride">
                <ExpansionPanel
                    expanded={isExpanded}
                >
                    <ExpansionPanelSummary
                        IconButtonProps={{
                            style: {
                                marginTop: isExpanded ? '20px': '12px'
                            }
                        }}
                        expandIcon={
                            <ExpandMore
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsExpanded(!isExpanded);
                                }}
                            />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div style={{width: '100%'}}>
                            <Grid container justify="space-between">
                                <Grid item>
                                    <Typography style={{ fontWeight: '800' }}>Suggested Rides</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography onClick={()=>{ fareList.length && setIsExpanded(!isExpanded)}} style={{fontWeight: '800', color: "rgb(31, 199, 31)" }}>View All</Typography>
                                </Grid>
                            </Grid>
                        </div>
                        
                        {
                            // This is for showing the book now option
                            !isExpanded &&
                            <>
                                <div style={{border: '1px solid green', padding: '5px', marginTop: '12px', borderRadius: '4px'}}>
                                    {
                                        searchRides.isApiActive ?
                                            <Loading />
                                        :
                                            <RideOption
                                                lowCost={selectedRide.price}
                                                carType={selectedRide.name}
                                                image={selectedRide.image}
                                                seatNumber={selectedRide.seat_number}
                                            />
                                    }
                                </div>
                                <RideFacilities setActiveRideFacility={setActiveRideFacility} />
                                <Button variant="contained" style={{ backgroundColor: "rgb(31, 199, 31)"}} fullWidth
                                    onClick={
                                        () => {
                                            setActiveRideFacility('paymentMethods');
                                            // props.dispatchRide(selectedRide);
                                        }
                                    }
                                    disabled={
                                        props.resumeRide ?
                                            false
                                         :
                                            (
                                                activeRideStatuses.includes(activeRide.status)  || 
                                                fareList.length < 1 
                                            )
                                    }
                                    >
                                    Book Ride
                                </Button>
                            </>
                        }
                    </ExpansionPanelSummary>
                    
                    <ExpansionPanelDetails>
                        <Grid container direction="column">
                            {
                                isExpanded && 
                                Object.values(carList).map((carData) => {
                                    const rdData = fareList.find((data) => (data.carId === carData.id)) || {};
                                    return (
                                        <Grid 
                                            onClick={(e)=> {
                                                e.preventDefault();
                                                setSelectedRide({
                                                    ...selectedRide,
                                                    ...rdData
                                                });
                                                setIsExpanded(false);
                                            }} 
                                            style={{marginBottom: '10px'}}
                                        >
                                            <RideOption
                                                lowCost={rdData.price}
                                                carType={rdData.name}
                                                image={rdData.image}
                                                seatNumber={rdData.seat_number}
                                            />
                                        </Grid>
                                    )
                                    }
                                )
                            }
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
          </div>
        </div>         
            <Dialog
                onClose={()=>{ setShowpopup(false) }}
                aria-labelledby="simple-dialog-title"
                open={showpopup}
                style={{ width: '100%' }}
                classes={{
                    paper: 'custom-dialog-pop-up'
                }}
            >
            <DialogTitle id="simple-dialog-title">
                {
                    activeRide.status === "0"  &&                
                    <LinearProgress  timeInterval={2000}/>                       
                }
                
                {
                    activeRide.isRideCreated && 
                    (
                        activeRide.status === "1"  ||
                        activeRide.status === "9" ||
                        activeRide.status === "6"
                    ) &&
                    <Grid container direction="column">
                        <Grid item >
                            <Grid container>
                                <Grid item>
                                    <Avatar
                                        alt={ activeRide.driver_name || 'Donald Trump' }
                                        src={ activeRide.driver_photo } 
                                    />
                                </Grid>

                                <Grid item>
                                    <Typography variant="subtitle">{activeRide.driver_name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <RatingComponent defaultValue={4} precision={0.5} />
                        </Grid>
                        
                        <Grid>
                            <PhoneIcon />  {activeRide.driver_phone || '9663675921'}
                        </Grid>
                        
                        <Grid>
                            {
                                activeRide.status === "1"  &&
                                <Typography variant="subtitle1">
                                    Driver Accepted the Request
                                </Typography>
                            }
                            {
                                activeRide.status === "9"  &&
                                <Typography variant="subtitle1">
                                    Driver is on the way
                                </Typography>
                            }

                            {
                                activeRide.status === "6"  &&
                                <Typography variant="subtitle1">
                                    Driver is at Pickup Location
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                }

                {
                    activeRide.status === "4"  &&
                    <RatingCard data={activeRide} />
                }

                {
                    activeRide.status === "5"  &&
                    <Typography variant="body1">
                        No Driver Available
                    </Typography>
                }
              
            </DialogTitle>
        </Dialog>
      </>
    )
}

export default withRouter(SuggestedRides);
