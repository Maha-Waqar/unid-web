import React, { useState, useContext } from 'react';
import Cards from 'react-credit-cards';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import * as Yup from 'yup';
import './CreditCard.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'react-credit-cards/es/styles-compiled.css';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import { connect } from 'react-redux';


import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  InputAdornment,
  FormLabel,
  Avatar,
  Grid
} from '@material-ui/core';
import { Button } from '@material-ui/core';


const styles = {
  radio: {
    '&$checked': {
      color: '#4B8DF8'
    }
  },
  checked: {}
};

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsList: [],
      showAddCredit: false,
      newCard: {
        cvv: '',
        expiry: '',
        number: '',
      },
      paymentMethod: 'cash',
    };
  }

  handleChangeEvent= (e) => {
    const val = e.target.value;
    const field = e.target.name;
    this.setState({
      newCard: {
        ...this.state.newCard, 
        [field]: val 
      }
    })
  }

  payNow = () => {
    const { appState } = this.props;
    switch (this.state.paymentMethod) {
      case "card": {
        const formData = new FormData();
        formData.append('passenger_id',appState && appState.userData && appState.userData.id )
        console.log(this.props);
        formData.append('transaction_amount', '000000000123')
        Axios({
          method: 'post',
          url: "http://220.158.200.73/unid_corp/apis/passenger_payement_gateway",
          data: formData,
          headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          console.log("post request data", res.data);
          if(res.data.status === 1) {
            window.location.href=res.data.payement_gateway_url;
            localStorage.setItem('initialRide', JSON.stringify(this.props.selectedRide));
          }
        })
        .catch(err => console.warn(err));
        break;
      }
      case "gopayz": {
        const userToken = localStorage.getItem('userlogintoken');
        Axios.get(`http://220.158.200.73/unid_corp/apis/verify_token?token=${userToken}`).then((res) => {
          if (res.data.status !== "error") {
            localStorage.setItem('initialRide', JSON.stringify(this.props.selectedRide));
            window.location.href= `http://220.158.200.73/unid_corp/apis/gopayz_preauth_payment?amount=${this.props.selectedRide.price}&token=${userToken}`
          }
        }).catch((error) => {
          console.log("token not matched", error)
        })
      }
    }
  }

  render() {
   const classes = this.props.classes;
    return (
      <div id="CreditCard">
        <div className="cc-header">
          <h2>Payment Methods</h2>
        </div>
        <FormControl component="fieldset">
          <RadioGroup 
            name="paymentmethod"
            value={this.state.paymentMethod}
            style={{
              width: '80%',
              margin: 'auto'
            }}
            onChange={(e) => {
              this.setState({paymentMethod: e.target.value})
            }}
            classes={{root: classes.radio, checked: classes.checked}}
          >
            <FormControlLabel value="card" control={<Radio />} labelPlacement="start"
              classes={{
                label: this.state.cardsList.length ? 'overridecardcss' : ''
              }}
              label = {
                this.state.cardsList.length
                ?
                  <Grid container justify="space-between">
                    <Grid item>Credit Card</Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item><CreditCardIcon /></Grid>
                        <Grid item>
                          xxxx {this.state.cardsList[0].number.substring(8,12)}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid class="card-logo">
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1978060/visa.png' alt='' class="visa" />
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1978060/mastercard.png' alt='' class="mastercard" />
                    </Grid>
                  </Grid>
                :
                  "Credit Card" 
              }
            />
            <FormControlLabel value="gopayz" control={<Radio />} labelPlacement="start" label="GoPayz Wallet" />
          </RadioGroup>
        </FormControl>

        <Button style={{width: '100px', margin: 'auto'}} onClick={this.payNow}> Submit </Button>
        {
          this.state.paymentMethod === "card" &&  
          <Avatar style={{ backgroundColor: '#28a745', position: "absolute", top: '10px', right: '24px' }}
            onClick={(e) => {
              e.preventDefault();
              this.setState({ showAddCredit: true })
            }}
          >
            <AddIcon style={{color: 'white'}}/>
          </Avatar>

        }
      </div>
    )
  }
}

export default withStyles(styles)(CreditCard);
