import React,{useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Dehaze
} from '@material-ui/icons';
import {
 withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import {  } from "module";

const SideList = ({toggleDrawer, history, location, userLogout, userData }) => (
    <div
      className='topnav-sidebar'
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div className="rider-profile">
        <div className="profile_id" onClick={()=>{history.push('/personalInformation')}}>
          <img src="../../../profile_pic.png" alt="Avatar"/></div>
        <div className="rider-info">      
        <div className="rider-id">{userData.name}</div>
          <div className="point-reward">{userData.reward_point} Points | Reward</div>
        </div>
      </div>
      <List>
        <ListItem button key='wallet'>
          <ListItemIcon><i className="fa fa-wallet"></i></ListItemIcon>
          <ListItemText primary='Wallet' />
        </ListItem>
        <ListItem button key='history' onClick={()=>{history.push('/history')}}>
          <ListItemIcon><i className="fa fa-history"></i></ListItemIcon>
          <ListItemText primary='History' />
        </ListItem>
        <ListItem button key='favourites' onClick={()=>{history.push('/favourites')}}>
          <ListItemIcon><i className="fa fa-heart"></i></ListItemIcon>
          <ListItemText primary='Favourites' />
        </ListItem>
        <ListItem button key='ride'>
          <ListItemIcon><i className="fa fa-car" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Your Ride' />
        </ListItem>
        <ListItem button key='notification' onClick={()=>{history.push('/notifications')}}>
          <ListItemIcon><i className="fa fa-bell" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Notification' />
        </ListItem>
        <ListItem button key='emergency'>
          <ListItemIcon><i className="fa fa-bars" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='Emergency' />
        </ListItem>
        <ListItem button key='about-us' onClick={()=>{history.push('/about-us')}}>
          <ListItemIcon><i className="fa fa-info-circle" aria-hidden="true"></i></ListItemIcon>
          <ListItemText primary='About Us' />
        </ListItem>
        <ListItem
          button 
          key='logout'
          onClick={()=>{
            localStorage.removeItem('userSessionData');
            userLogout();   
          }}
        >
          <ListItemIcon><i className="fa fa-power-off"></i></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>  
    </div>
  );

const SideBar = (props) => {
    const [left, setLeft] = useState(false);

    const toggleDrawer = (event) => {
      // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      //   return;
      // }
      event.stopPropagation(); 
      setLeft(!left);
    }

    const userData = props.appState && props.appState.userData;
    return (
      <React.Fragment>
        <div onClick={toggleDrawer} className="sidebar">
          <Dehaze style={{ marginLeft: "10px", marginRight: "10px", width: "24px", height:"24px" }} />
          {/* <i className="fa fa-bars" aria-hidden="true" style={{ marginLeft: "10px", marginRight: "10px", width: "40px", height:"40px" }}></i> */}
        </div>
        <Drawer open={left} onClose={toggleDrawer}>
          <SideList toggleDrawer={toggleDrawer} {...props} userData={userData} />
        </Drawer> 
      </React.Fragment>
    )
}


const mapStateToProps = (state,ownprops) => (
  {
    ...state
  }
);

const mapDispatchProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchProps)(withRouter(SideBar));
