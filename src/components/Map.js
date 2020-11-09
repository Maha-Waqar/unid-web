import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Navbar from 'react-bootstrap/Navbar'
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import '../pages/Home/home.css';
Geocode.setApiKey( "AIzaSyBtnC40--ks77FHt8xgBuOkR0xePyXbNZ8" );
Geocode.enableDebug();



class Map extends Component{
	constructor( props ){
		super( props );
		this.state = {
      toaddress: '',
      fromaddress: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			tomarkerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
      },
      frommarkerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
      },
      city: '',
      query: '',
      left: false,
		}
  }
  
	/** Get the current address from the default map position and set those values in the state */
	componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const toaddress = response.results[0].formatted_address,
              addressArray =  response.results[0].address_components;
        const fromaddress = response.results[0].formatted_address;
        console.log( 'city', toaddress );
        console.log( 'city', fromaddress );
        console.log( 'results', response.results[0]);

				this.setState( {
          toaddress: ( toaddress ) ? toaddress : '',
          fromaddress : ( fromaddress ) ? fromaddress : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
  };
  
	/** Component should only update ( meaning re-render ), when the user selects the address, or drags the pin	 */
	shouldComponentUpdate( nextProps, nextState ){
		if (
      this.state.tomarkerPosition.lat !== this.props.center.lat ||
      this.state.frommarkerPosition.lat !== this.props.center.lat ||
      this.state.toaddress !== nextState.toaddress ||
      this.state.fromaddress !== nextState.fromaddress 
		) {
			return true
    } else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
  
	/** And function for address input */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
  };
  
	/** This Event triggers when the marker window is closed */
	onInfoWindowClose = ( event ) => {
	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 */
	toonMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const toaddress = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components;

				this.setState( {
          toaddress: ( toaddress ) ? toaddress : '',
					tomarkerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
			},
			error => {
				console.error(error);
			}
		);
	};
  fromonMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const fromaddress = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components;

				this.setState( {
          fromaddress : ( fromaddress ) ? fromaddress : '',
					frommarkerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
			},
			error => {
				console.error(error);
			}
		);
	};
	/*** When the user types an address in the search box ***/
	toonPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const toaddress = place.formatted_address,
		      addressArray =  place.address_components,
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		this.setState({
			toaddress: ( toaddress ) ? toaddress : '',
			tomarkerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
  };
  fromonPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const fromaddress = place.formatted_address,
		      addressArray =  place.address_components,
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		this.setState({
      fromaddress : ( fromaddress ) ? fromaddress : '',
			frommarkerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};
  handleSubmit(event) {
    event.preventDefault()
  }

  
	render() {
    
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
            // For Auto complete Search Box
            <div className="locations-input">     
              {/*For top left nav*/}
              <div className="topnav">
                <i className="fa fa-bars" aria-hidden="true" onClick={this.props.toggleDrawer('left', true)}></i> 
              </div>
              <GoogleMap google={ this.props.google }
                        defaultZoom={ this.props.zoom }
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
              >
                <div className="row locations">
                  <div className="col-2 icons" style={{ padding:'0px',width:'fit-content' }}>
                    <img src="../../../depart_des.JPG" alt="Avatar"/>
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-11" style={{padding:'0px'}}>
                        <p className="to-from-address">
                          <input className="form-control no-border" id="departure_location" placeholder="From Location ?" onChange={ this.onChange } value={ this.state.fromaddress }/>
                          <Autocomplete
                            className="form-group"
                            style={{
                              width: '100%',
                              height: '40px',
                              paddingLeft: '16px',
                              margin: 'auto',
                              marginTop: '2px'
                            }}
                            onPlaceSelected={ this.fromonPlaceSelected }
                            componentRestrictions={{country: "my"}}
                            types={['(regions)']}
                            placeholder="FROM"
                          /> 
                        </p>
                      </div>
                      <div className="col-1" style={{padding:'0px',textAlign:'right'}}>
                        <i className="fa fa-heart"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-11"  style={{padding:'0px'}}>
                        <p className="to-from-address">
                          <input className="form-control no-border" id="destination_location" placeholder="To Location ?" onChange={ this.onChange } value={ this.state.toaddress }/>
                          <Autocomplete
                            className="form-group"
                            style={{
                              width: '100%',
                              height: '40px',
                              paddingLeft: '16px',
                              margin: 'auto',
                              marginTop: '2px'
                            }}
                            onPlaceSelected={ this.toonPlaceSelected }
                            componentRestrictions={{country: "my"}}
                            types={['(regions)']}
                            placeholder="TO"
                          />
                        </p>
                      </div>
                      <div className="col-1" style={{padding:'0px',textAlign:'right'}}>
                        <i className="fa fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <Button className='edit_location_button' type="submit" onClick={this.handleSubmit}>
                    <div>Edit Location</div>
                  </Button>
                </div>
                {/* InfoWindow on top of marker */}
                <InfoWindow
                  onClose={this.onInfoWindowClose}
                  position={{ lat: ( this.state.tomarkerPosition.lat + 0.0018 ), lng: this.state.tomarkerPosition.lng }}
                >
                  <div>
                    <span style={{ padding: 0, margin: 0 }}>{ this.state.toaddress }</span>
                  </div>
                </InfoWindow>
                <InfoWindow
                  onClose={this.onInfoWindowClose}
                  position={{ lat: ( this.state.frommarkerPosition.lat + 0.0018 ), lng: this.state.frommarkerPosition.lng }}
                >
                  <div>
                    <span style={{ padding: 0, margin: 0 }}>{ this.state.fromaddress }</span>
                  </div>
                </InfoWindow>
                {/*Marker*/}
                <Marker google={this.props.google}
                        name={'Dolores park'}
                        draggable={true}
                        onDragEnd={ this.toonMarkerDragEnd }
                        position={{ lat: this.state.tomarkerPosition.lat, lng: this.state.tomarkerPosition.lng }}
                />
                <Marker />
                <Marker google={this.props.google}
                        name={'Dolores park'}
                        draggable={true}
                        onDragEnd={ this.fromonMarkerDragEnd }
                        position={{ lat: this.state.frommarkerPosition.lat, lng: this.state.frommarkerPosition.lng }}
                />
                <Marker />
              </GoogleMap>
            </div>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = 
        <div className="home_page">
          <div className="home-container-map">
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBprptSdG-fBX56k_nWnUl-HugtF8pFcQA&libraries=places"
              loadingElement={
                <div style={{ height: `100%` }} />
              }
              containerElement={
                <div style={{ height: this.props.height }} />
              }
              mapElement={
                <div style={{ height: `100%` }} />
              }
            />
             
          </div>
        </div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default Map;
