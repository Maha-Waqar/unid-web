import _ from 'lodash';
import React from 'react';
import {
  compose
} from 'redux';
import {
  Search,
  Close
} from '@material-ui/icons';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker  
} from "react-google-maps";

import SearchIcon from "@material-ui/icons/Search";
import {
  TextField,
  IconButton,
  InputAdornment
} from '@material-ui/core';
import './SearchGoogleMaps.css'
import {
    SearchBox
} from "react-google-maps/lib/components/places/SearchBox";

import {
  StandaloneSearchBox
} from "react-google-maps/lib/components/places/StandaloneSearchBox";

class MapWithASearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      center: null,
      value: props.defaultValue
    }
  }


  componentWillMount() {
    const refs = {}
    let defaultCenterPosition = {};
    let self = this;
    this.setState({
      bounds: null,
      center: self.props.initCenter || defaultCenterPosition,
      markers: self.props.initMarkers || [],
      onMapMounted: ref => {
        refs.map = ref;
      },
      onBoundsChanged: () => {
        self.setState({
          bounds: refs.map.getBounds(),
          center: refs.map.getCenter(),
        })
      },
      onSearchBoxMounted: ref => {
        refs.searchBox = ref;
      },
      onPlacesChanged: () => {
        const places = refs.searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        });

        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = _.get(nextMarkers, '0.position', self.state.center);
        self.props.handleSelecetedDropDown(places, nextMarkers, nextCenter);    
        self.setState({
          center: nextCenter,
          markers: nextMarkers,
          value: places.length ? places[0].name : ''
        });
        self.props.backspaceEventHandler();
      },
    })
    if (
      (
        navigator.geolocation &&  window.location.protocol === 'https:'
      )
    ) {
      navigator.geolocation.getCurrentPosition(function(position) {
        defaultCenterPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.setState({
          center: defaultCenterPosition,
        });    
      }, function(err) {
      });
    }    
  }

  render() {
    return (
      <div className="searchbox googlemap"
        style={{
          position: "absolute",
          top: "5%",
          width: "92%",
          marginLeft: "3%"
        }}
      >
        <GoogleMap
          className="searchgooglemap"
          ref={this.state.onMapMounted}
          defaultZoom={15}
          center={this.state.center}
          onBoundsChanged={this.state.onBoundsChanged}
          defaultZoom={14}
          defaultCenter={this.state.center}
          defaultOptions={{
            disableDefaultUI: true,
            defaultZoom: false,
          }}
        >
          <StandaloneSearchBox
            className="searchgooglemap"
            ref={this.state.onSearchBoxMounted}
            bounds={this.state.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={this.state.onPlacesChanged}
          >
            <TextField
              ref={this.textInput}
              value={this.state.value}
              onChange={(e) =>{
                this.setState({value: e.currentTarget.value});
              }}
              placeholder={this.props.placeholder}
              InputProps={{
                startAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                ),
                endAdornment: (
                  <IconButton 
                    onClick={()=>{
                      this.setState({ value: '' })
                    }}
                  >
                    <Close />
                  </IconButton>
                )

              }}
            />
            {/* <input
              ref={this.textInput}
              type="text"
              placeholder={this.props.placeholder}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            /> */}
          </StandaloneSearchBox>
          {this.state.markers && this.state.markers.map((marker, index) =>
            <Marker
              key={index}
              position={marker.position}
              onClick={this.props.handleSelecetedDropDown.bind(this, marker)}
              icon = {this.props.currentView === "pickup" ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png':'http://i.imgur.com/7teZKif.png'}
              scaledSize = {new window.google.maps.Size(64, 64)}
            />
          )}
        </GoogleMap>
      </div>
    )
  }
}


export default compose(
  withScriptjs,
  withGoogleMap
)(MapWithASearchBox);

