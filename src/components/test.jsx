import React from 'react';
import '../pages/Home/home.css';
import Map from './Map';
import { makeStyles } from '@material-ui/core/styles';
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
//import SearchBar from '@material-ui-search-bar';
import Script from 'react-load-script';
import { Form, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Test() {

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    city: '',
    query: '',
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      //className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className="rider-profile">
        <div className="profile_id"><img src="../../../profile_pic.png" alt="Avatar"/></div>
        <div className="rider-info">      
          <div className="rider-id">rider0305001</div>
          <div className="point-reward">1939 Points | Reward</div>
        </div>
      </div>
      <List>
        <ListItem button key='wallet'>
          <ListItemIcon><i className="fa fa-wallet"></i></ListItemIcon>
          <ListItemText primary='Wallet' />
        </ListItem>
        <ListItem button key='history'>
          <ListItemIcon><i className="fa fa-history"></i></ListItemIcon>
          <ListItemText primary='History' />
        </ListItem>
        <ListItem button key='favourites'>
          <ListItemIcon><i className="fa fa-heart"></i></ListItemIcon>
          <ListItemText primary='Favourites' />
        </ListItem>
        <ListItem button key='ride'>
          <ListItemIcon><i className="fa fa-car" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Your Ride' />
        </ListItem>
        <ListItem button key='notification'>
          <ListItemIcon><i className="fa fa-bell" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Notification' />
        </ListItem>
        <ListItem button key='emergency'>
          <ListItemIcon><i className="fa fa-bars" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Emergency' />
        </ListItem>
        <ListItem button key='about-us'>
          <ListItemIcon><i className="fa fa-info-circle" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='About Us' />
        </ListItem>
        <ListItem button key='logout'>
          <ListItemIcon><i className="fa fa-power-off"></i></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>  
    </div>
  );

  return (
    <div className="home_page">
      <div className="topnav">
        <i className="fa fa-bars" aria-hidden="true" onClick={toggleDrawer('left', true)}></i> 
      </div>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      
      <div className="home-container-map">
        <div className="locations-input">
          <div className="row locations">
            <div className="col-2 icons">
              <img src="../../../depart_des.JPG" alt="Avatar"/>
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-10">
                  <p className="to-from">From</p>
                  <p className="to-from-address"><input className="form-control no-border" id="departure_location" placeholder="From Location ?"/></p>
                </div>
                <div className="col-2">
                  <i className="fa fa-heart"></i>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <p className="to-from">To</p>
                  <p className="to-from-address"><input className="form-control no-border" id="destination_location" placeholder="To Location ?"/></p>
                </div>
                <div className="col-2">
                  <i className="fa fa-heart"></i>
                </div>
              </div>
            </div>
            <Button className='edit_location_button' type="submit" /* onClick={e => authenticate(e)} *disabled={isSubmitting || loginSuccessful} */>
              <div>Edit Location</div>
            </Button>
          </div>
        </div>  
       Map 



        <div className="suggested-rides">
          <div className="title"><strong>Suggested Rides</strong></div>
          <div className="view-all"><p>View All  ˄</p></div>
          <div className="selected-car-types row">
            <div className="col-3">
              <img src="../../../profile_pic.png" alt="Avatar"/>
            </div>
            <div className="col-5 selected-car-name">
              <p><strong>Go Unid</strong></p>
            </div>
            <div className="col-4 selected-car-price">
              <div><p className="discounted-price">RM 18.00</p>
              <p className="original-price">RM 30.00</p></div>
            </div>
          </div>
          <div className="rides_options">
            <div className="row">
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Ride Type</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>  
                <p>Payment Methods</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>  
                <p>Ride Date</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Favourite Driver</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Promo Code</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Note</p>
              </div>
            </div>
          </div>
          <div className="book_button_space">
            <Button className='book_button' type="submit" size="lg" block/* onClick={e => authenticate(e)} *disabled={isSubmitting || loginSuccessful} */>
              <div>Book Now</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

