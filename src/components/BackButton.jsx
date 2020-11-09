import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  ArrowBackIos
} from '@material-ui/icons';
import { Avatar } from '@material-ui/core';

class BackButton extends React.Component {
  
  render() {
    return (
      <div id="BackButton" style={{'text-align':'left', 'padding':'10px'}}>
        <Avatar
          style={{backgroundColor : 'white' , boxShadow: '0 0 12px #888888' }}
          onClick={(e)=> { 
            this.props.onClickEventHandler && this.props.onClickEventHandler() 
          }}
        >
          <ArrowBackIos style={{marginLeft:'10px', color: 'black'}}/>
        </Avatar>
      </div>
    );
  }
}

export default BackButton;
