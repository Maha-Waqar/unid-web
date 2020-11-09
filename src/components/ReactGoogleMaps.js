import React from 'react';
import { Avatar } from '@material-ui/core';
import dummyjson from './dummy.json';
import {
  compose
} from 'redux';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  OverlayView
} from 'react-google-maps';

class StyledMapWithAnInfoBox extends React.Component {
  constructor(props){
    super(props);
    this.gmapRef = React.createRef();
    this.state = {
      pos : props.centerPos || null,
      loadMap: false
    }
  
  }
  componentDidMount(){
    let self = this;
    if (
      (
        navigator.geolocation &&  window.location.protocol === 'https:'
      )
    ) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.setState({pos: self.state.pos || pos, loadMap: true});     
      });
    }
  }

  render() {
    if(this.state.loadMap)
      return (
        <GoogleMap
          defaultZoom={14}
          ref={(map) => this._map = map} 
          defaultCenter={this.state.pos}
          defaultOptions={{
            disableDefaultUI: true,
            defaultZoom: false,
          }}
        >

          {
            this.props.children  ? 
              this.props.children :
            <Marker
              key={this.props.id}
              position={this.state.pos}
            />

          }
        </GoogleMap>
      )
    return null;
  }
}


export default compose(
  withScriptjs,
  withGoogleMap
)(StyledMapWithAnInfoBox);