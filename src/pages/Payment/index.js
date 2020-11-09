import React, { useState, useContext } from 'react';
import BackButton from '../../components/BackButton'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from '@material-ui/styles';

import './payment.css';


class Payment extends React.Component {
  
  render() {
    return (
      <div id="PaymentMethod">
        <BackButton/>
        <div className="payment-header">
          <h2>Payment Method</h2>
        </div>
        <RadioGroup onChange={ this.onChange } horizontal className="payment-radio" style={{'display':'block'}}>
          <FormControlLabel className="col-12" value="cash" labelPlacement="start" label={<span>Cash</span>} style={{'padding-bottom':'10px', 'justifyContent':'space-between'}} control={<Radio />} />
          <FormControlLabel className="col-12" value="credit-card" control={<Radio />} labelPlacement="start" label={<span>Credit Card</span>} style={{'padding':'10px', 'marginLeft':'5px'}}/>
          <FormControlLabel className="col-12" value="GoPayz" labelPlacement="start"label={<span>GoPayz Wallet</span>} style={{'padding':'10px', 'marginLeft':'70px'}} control={<Radio />} />
        </RadioGroup> 
      </div>
    );
  }
}

export default Payment;